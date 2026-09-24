import origins from "./generated/origins.json";

export const SITE_URL = origins.site;
export const SITE_NAME = "Baby UI";

export const DEFAULT_KEYWORDS = [
	"react components",
	"svelte components",
	"ui library",
	"shadcn alternative",
	"animated components",
	"tailwind components",
	"d3 charts",
];

/** `origin` is the request's own origin (`page.url.origin` / `event.url.origin`), so this
 * resolves to the local dev server in dev and the real domain once deployed. */
export function absoluteUrl(origin: string, path: string): string {
	return new URL(path, origin).toString();
}

/** Builds the branded OG image URL for a page; `tag` is a small category label. `origin`
 * is the request's own origin, so a local preview renders from the local dev server. */
export function ogImageUrl(
	origin: string,
	params: { title: string; description?: string; tag?: string },
): string {
	const url = new URL("/og", origin);
	url.searchParams.set("title", params.title);
	if (params.description) url.searchParams.set("description", params.description);
	if (params.tag) url.searchParams.set("tag", params.tag);
	return url.toString();
}
