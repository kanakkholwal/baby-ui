import { guides } from "virtual:docvia/source";
import { CATEGORIES, docsPath } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import { categoryHref } from "$lib/registry";
import { absoluteUrl, SITE_URL } from "$lib/seo";
import type { RequestHandler } from "./$types";

export const prerender = true;

// Prerendered once at build time: always the real domain, never the machine that built it.
function url(path: string, priority: string): string {
	return `<url><loc>${absoluteUrl(SITE_URL, path)}</loc><priority>${priority}</priority></url>`;
}

export const GET: RequestHandler = async () => {
	const staticPages = [url("/", "1.0"), url("/components", "0.9")];

	const categoryPages = CATEGORIES.filter((c) => specs.some((s) => s.category === c)).map(
		(c) => url(categoryHref(c), "0.7"),
	);

	// Alpha/experimental components are noindexed; keep them out of the sitemap too.
	const componentPages = specs
		.filter((s) => s.status === "stable" || s.status === "beta")
		.map((s) => url(docsPath(s), "0.6"));

	// Cast, not inferred: `guides`' real type comes from a generated `.docvia/source` file
	// a fresh CI checkout doesn't have yet, where it resolves to `any`.
	const guidePages = guides.getPages() as { url: string; data: { draft?: boolean } }[];
	const docPages = guidePages
		.filter((page) => !page.data.draft)
		.map((page) => url(page.url, "0.5"));

	const body = [...staticPages, ...categoryPages, ...componentPages, ...docPages].join(
		"",
	);

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`,
		{ headers: { "content-type": "application/xml" } },
	);
};
