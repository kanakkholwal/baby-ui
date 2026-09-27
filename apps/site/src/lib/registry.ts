// Client-safe: the zod-free categories entry plus types only from the schema. Anything that reads
// the spec list lives in $lib/server/registry.ts and reaches pages as load data.
import type { ComponentSpec } from "@baby-ui/registry-schema";
import {
	CATEGORIES,
	CATEGORY,
	type Category,
	categoryHref,
	docsPath,
	TOP_LEVEL_CATEGORIES,
} from "@baby-ui/registry-schema/categories";

/** Marketing count, floored to the ten below with a plus (182 reads "180+"). */
export const componentCountLabel = (count: number) => `${Math.floor(count / 10) * 10}+`;

// Derived from the schema's category table; add or change a category there, not here.
export const CATEGORY_LABEL = Object.fromEntries(
	CATEGORIES.map((c) => [c, CATEGORY[c].label]),
) as Record<Category, string>;

export const CATEGORY_BLURB = Object.fromEntries(
	CATEGORIES.map((c) => [c, CATEGORY[c].blurb]),
) as Record<Category, string>;

/** Categories served at `/<category>`, not /components. */
export const TOP_LEVEL = TOP_LEVEL_CATEGORIES;

export { categoryHref };

export const specHref = (spec: Pick<ComponentSpec, "category" | "slug">): string =>
	docsPath(spec);

/** A category that has at least one component, with its count. */
export type NavCategory = {
	category: Category;
	label: string;
	href: string;
	count: number;
};

/** What a component card or showcase panel needs, without the full spec. */
export type CardItem = {
	slug: string;
	name: string;
	description: string;
	href: string;
	tier: ComponentSpec["tier"];
	defaults: Record<string, unknown>;
};

/** One search/catalog row; served from /catalog.json so pages don't carry it. */
export type CatalogItem = {
	slug: string;
	name: string;
	category: Category;
	tier: ComponentSpec["tier"];
	description: string;
	keywords: string[];
	href: string;
};

/** The global top-level nav, shared by the header links and the mobile drawer's top row. */
export function siteNav(
	categories: NavCategory[],
): { href: string; label: string; match: string }[] {
	return [
		{ href: "/components", label: "Components", match: "/components" },
		...categories
			.filter((c) => CATEGORY[c.category].inNav)
			.map((c) => ({ href: c.href, label: c.label, match: c.href })),
		{ href: "/docs", label: "Docs", match: "/docs" },
		...(__SHOW_PRO__ ? [{ href: "/pricing", label: "Pricing", match: "/pricing" }] : []),
	];
}

export type SearchItem = {
	href: string;
	name: string;
	slug: string;
	group: string;
	description: string;
	/** Space-separated words the command filter also matches. */
	keywords: string;
};

/** Flat index for the command palette. */
export function searchItems(catalog: CatalogItem[]): SearchItem[] {
	return catalog
		.map((s) => ({
			href: s.href,
			name: s.name,
			slug: s.slug,
			group: CATEGORY_LABEL[s.category],
			description: s.description,
			// The command filter matches these words too, so a search finds what a component does.
			keywords: [s.slug, CATEGORY_LABEL[s.category], ...s.keywords, s.description].join(
				" ",
			),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

let catalogRequest: Promise<CatalogItem[]> | undefined;

/** The prerendered catalog, fetched once per session on first need. */
export function loadCatalog(): Promise<CatalogItem[]> {
	catalogRequest ??= fetch("/catalog.json")
		.then((res) => (res.ok ? (res.json() as Promise<CatalogItem[]>) : []))
		.catch(() => {
			catalogRequest = undefined;
			return [];
		});
	return catalogRequest;
}

export type SidebarGroup = {
	category: Category;
	label: string;
	items: {
		slug: string;
		name: string;
		href: string;
		status: ComponentSpec["status"];
		tier: ComponentSpec["tier"];
	}[];
};

export type AdjacentComponent = { name: string; href: string };

// Lives in the schema so endpoints, auto demos and `pnpm emails` share one rule.
export { defaultProps } from "@baby-ui/registry-schema";
