import { render } from "takumi-js";
import { OG_FONT_FILES } from "./fonts";
import type { OgReply, OgRequest } from "./protocol";

type Font = { name: string; data: ArrayBuffer; weight?: number };

// takumi's browser build fetches its WASM from a hashed asset URL, so the HTTP cache keeps
// the binary across visits; this worker keeps the compiled renderer and fonts across renders.
let fonts: Promise<Font[]> | undefined;
let warmed: Promise<unknown> | undefined;

const loadFonts = () =>
	(fonts ??= Promise.all(
		OG_FONT_FILES.map(async ({ url, ...font }) => ({
			...font,
			data: await (await fetch(url)).arrayBuffer(),
		})),
	));

// A transparent 1x1 PNG, so one unreachable image blanks out instead of failing the whole card.
const BLANK = Uint8Array.from(
	atob(
		"iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
	),
	(c) => c.charCodeAt(0),
);

// A host without CORS headers retries through wsrv.nl, a free image CDN that adds them; no image
// request ever reaches our own Worker, which is what keeps this render off its daily quota.
async function fetchImage(url: string, init?: RequestInit): Promise<Response> {
	const response =
		(await tryFetch(url, init)) ??
		(await tryFetch(`https://wsrv.nl/?url=${encodeURIComponent(url)}`, init));
	if (response) return response;
	console.warn(`OG preview: could not load ${url}`);
	return new Response(BLANK, { headers: { "content-type": "image/png" } });
}

// A CORS refusal surfaces as a network error, so both it and a bad status read as "no image".
async function tryFetch(url: string, init?: RequestInit): Promise<Response | null> {
	try {
		const response = await fetch(url, init);
		return response.ok ? response : null;
	} catch {
		return null;
	}
}

// One throwaway pixel compiles the WASM and instantiates the renderer before a real card asks.
const warm = () =>
	(warmed ??= loadFonts().then((faces) =>
		render("<div></div>", { width: 1, height: 1, fonts: faces }),
	));

function reply(message: OgReply, transfer: Transferable[] = []) {
	globalThis.postMessage(message, { transfer });
}

addEventListener("message", async (event: MessageEvent<OgRequest>) => {
	const request = event.data;
	try {
		if (request.type === "warm") {
			await warm();
			reply({ id: request.id, type: "done", png: null });
			return;
		}
		await warm();
		const png = await render(request.html, {
			width: request.width,
			height: request.height,
			css: request.css,
			fonts: await loadFonts(),
			images: { fetch: fetchImage },
		});
		const bytes = png.slice().buffer;
		reply({ id: request.id, type: "done", png: bytes }, [bytes]);
	} catch (error) {
		reply({
			id: request.id,
			type: "error",
			message: error instanceof Error ? error.message : String(error),
		});
	}
});
