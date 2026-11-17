import { render } from "svelte/server";
import { googleFonts } from "takumi-js/helpers";
import { ImageResponse } from "takumi-js/response";
import OgTemplate from "#lib/components/og-template.svelte";
import layoutCss from "../layout.css?inline";
import type { RequestHandler } from "./$types";

type Fonts = Awaited<ReturnType<typeof googleFonts>>;

// One font download per isolate, started on first use; a failure is dropped so the next
// request retries instead of replaying a rejected promise for the isolate's lifetime.
let fontsPromise: Promise<Fonts> | undefined;
function fonts(): Promise<Fonts> {
	fontsPromise ??= googleFonts({
		families: [{ name: "Inter", weight: [400, 600, 700] }],
	});
	fontsPromise.catch(() => {
		fontsPromise = undefined;
	});
	return fontsPromise;
}
fonts().catch(() => undefined);

const HEADERS = {
	"cache-control":
		"public, immutable, no-transform, max-age=31536000, stale-while-revalidate=86400",
};

export const GET: RequestHandler = async ({ url, request, platform }) => {
	// The Workers edge cache keeps each card per location, so a WASM render runs once per URL.
	const edge = platform?.caches?.default;
	const cached = await edge?.match(request);
	if (cached) return cached;

	const title = url.searchParams.get("title") ?? "Baby UI";
	const description = url.searchParams.get("description") ?? undefined;
	const tag = url.searchParams.get("tag") ?? undefined;

	const { head, body } = render(OgTemplate, { props: { title, description, tag } });

	const response = new ImageResponse(`${head}${body}`, {
		width: 1200,
		height: 630,
		css: layoutCss,
		fonts: await fonts(),
		headers: HEADERS,
	});
	if (edge) {
		const store = edge.put(request, response.clone());
		if (platform?.context) platform.context.waitUntil(store);
		else await store;
	}
	return response;
};
