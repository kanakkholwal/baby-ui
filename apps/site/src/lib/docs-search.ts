import { specs } from "@baby-ui/registry-schema/components";
import { createFetchClient, type SearchResult } from "@docvia/search";
import { specHref } from "$lib/registry";

export type DocsHit = {
	href: string;
	page: string;
	/** The section heading, when the match is under one other than the page title. */
	section: string | null;
	snippet: string;
};

const client = createFetchClient("/api/search");
const components = new Map(specs.map((spec) => [spec.slug, specHref(spec)]));

// Hits carry a page slug; component pages and guides share one slug namespace.
const pageFor = (slug: string) =>
	components.get(slug) ?? (slug === "index" ? "/docs" : `/docs/${slug}`);

/** Text around the first query word found in `content`, with ellipses where it was cut. */
function snippetFor(content: string, query: string, radius = 70): string {
	const text = content.replace(/\s+/g, " ").trim();
	const lower = text.toLowerCase();
	const at = query
		.toLowerCase()
		.split(/\s+/)
		.filter(Boolean)
		.map((word) => lower.indexOf(word))
		.filter((i) => i >= 0)
		.sort((a, b) => a - b)[0];
	if (at === undefined) return text.slice(0, radius * 2);
	const start = Math.max(0, at - radius);
	const end = Math.min(text.length, at + radius);
	return `${start > 0 ? "…" : ""}${text.slice(start, end)}${end < text.length ? "…" : ""}`;
}

/** Section-level hits from docvia's search endpoint, linked to the page and heading they sit under. */
export async function searchDocs(query: string, limit = 6): Promise<DocsHit[]> {
	const results: SearchResult[] = await client.search(query, { limit });
	return results.map((hit) => {
		const page = pageFor(hit.slug);
		const anchored = hit.sectionId !== "_top" && hit.sectionTitle !== hit.pageTitle;
		return {
			href: anchored ? `${page}#${hit.sectionId}` : page,
			page: hit.pageTitle,
			section: anchored ? hit.sectionTitle : null,
			snippet: snippetFor(hit.content, query),
		};
	});
}
