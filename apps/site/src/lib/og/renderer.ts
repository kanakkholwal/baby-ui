import type { OgReply, OgRequest } from "./protocol";

type Pending = {
	resolve: (png: ArrayBuffer | null) => void;
	reject: (error: Error) => void;
};
type Job = { type: "warm" } | Omit<Extract<OgRequest, { type: "render" }>, "id">;

const WIDTH = 1200;
const HEIGHT = 630;
// Object URLs for the last few renders, so toggling a control back shows its card at once.
const CACHE_SIZE = 16;

let worker: Worker | undefined;
let warming: Promise<void> | undefined;
let nextId = 0;
const pending = new Map<number, Pending>();
const cache = new Map<string, string>();

function failAll(message: string) {
	for (const job of pending.values()) job.reject(new Error(message));
	pending.clear();
}

function connect(): Worker {
	if (worker) return worker;
	const next = new Worker(new URL("./render.worker.ts", import.meta.url), {
		type: "module",
	});
	next.addEventListener("message", (event: MessageEvent<OgReply>) => {
		const reply = event.data;
		const job = pending.get(reply.id);
		if (!job) return;
		pending.delete(reply.id);
		if (reply.type === "done") job.resolve(reply.png);
		else job.reject(new Error(reply.message));
	});
	// A crashed worker is dropped whole; the next call starts and warms a fresh one.
	next.addEventListener("error", () => {
		failAll("The OG renderer stopped");
		next.terminate();
		worker = undefined;
		warming = undefined;
	});
	worker = next;
	return next;
}

function call(job: Job): Promise<ArrayBuffer | null> {
	const id = ++nextId;
	return new Promise((resolve, reject) => {
		pending.set(id, { resolve, reject });
		connect().postMessage({ ...job, id });
	});
}

/** Starts the worker and compiles the WASM and fonts ahead of the first card. Idempotent. */
export function warmOgRenderer(): Promise<void> {
	warming ??= call({ type: "warm" }).then(() => undefined);
	return warming;
}

/** Rasterises a card's HTML at 1200x630 off the main thread; resolves to an object URL. */
export async function renderOgPng(html: string, css: string): Promise<string> {
	const hit = cache.get(html);
	if (hit) {
		cache.delete(html);
		cache.set(html, hit);
		return hit;
	}
	const png = await call({ type: "render", html, css, width: WIDTH, height: HEIGHT });
	if (!png) throw new Error("The OG renderer returned no image");
	const url = URL.createObjectURL(new Blob([png], { type: "image/png" }));
	cache.set(html, url);
	const oldest = cache.size > CACHE_SIZE ? cache.keys().next().value : undefined;
	if (oldest !== undefined) {
		URL.revokeObjectURL(cache.get(oldest) ?? "");
		cache.delete(oldest);
	}
	return url;
}
