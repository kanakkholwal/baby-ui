import type { SearchResult } from "@docvia/search";

export type DocsHit = {
	href: string;
	page: string;
	/** The section heading, when the match is under one other than the page title. */
	section: string | null;
	snippet: string;
};

type DocsSearch = (query: string, limit?: number) => Promise<DocsHit[]>;

let loading: Promise<DocsSearch> | null = null;

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

/** Loads the prebuilt docs index once, on first use; the palette works without it until then. */
export function loadDocsSearch(): Promise<DocsSearch> {
	loading ??= (async () => {
		const [{ createSearch }, res] = await Promise.all([
			import("@docvia/search"),
			fetch("/search-index.json"),
		]);
		if (!res.ok) throw new Error(`search index: ${res.status}`);
		const data = (await res.json()) as { index: string; pages: Record<string, string> };
		const { search } = await createSearch(data.index);
		return async (query, limit = 6) =>
			(await search(query, { limit })).flatMap((hit: SearchResult) => {
				const page = data.pages[hit.slug];
				if (!page) return [];
				const anchored = hit.sectionId && hit.sectionTitle !== hit.pageTitle;
				return [
					{
						href: anchored ? `${page}#${hit.sectionId}` : page,
						page: hit.pageTitle,
						section: anchored ? hit.sectionTitle : null,
						snippet: snippetFor(hit.content, query),
					},
				];
			});
	})().catch((error) => {
		loading = null;
		throw error;
	});
	return loading;
}
