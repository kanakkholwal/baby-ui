import type { Category, ComponentSpec } from "@baby-ui/registry-schema";
import { CATEGORIES } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";

export const CATEGORY_LABEL: Record<Category, string> = {
	base: "Base",
	blocks: "Blocks",
	advanced: "Advanced",
	animated: "Animated",
	agents: "Agents",
};

export const CATEGORY_BLURB: Record<Category, string> = {
	base: "The controls every interface needs, with the motion already worked out.",
	blocks: "Whole sections you would otherwise rebuild on every project.",
	advanced: "Components with real interaction models behind them.",
	animated: "Pieces where the motion is the point.",
	agents: "Interface parts for products that talk back: messages, tools, reasoning.",
};

/** Nav entries, derived from the specs so a new component shows up without edits here. */
export function navCategories(): { href: string; label: string; match: string }[] {
	return CATEGORIES.filter((c) => specs.some((s) => s.category === c)).map(
		(category) => ({
			href: `/components/${category}`,
			label: CATEGORY_LABEL[category],
			match: `/components/${category}`,
		}),
	);
}

/** The global top-level nav, shared by the header links and the mobile drawer's top row. */
export function siteNav(): { href: string; label: string; match: string }[] {
	return [
		{ href: "/components", label: "Components", match: "/components" },
		...navCategories().filter((c) => c.label === "Agents"),
		{ href: "/docs", label: "Docs", match: "/docs" },
	];
}

export type SearchItem = {
	href: string;
	name: string;
	slug: string;
	group: string;
	description: string;
};

/** Flat index for the command palette, rebuilt from the specs on every load. */
export function searchItems(): SearchItem[] {
	return specs
		.map((s) => ({
			href: `/components/${s.category}/${s.slug}`,
			name: s.name,
			slug: s.slug,
			group: CATEGORY_LABEL[s.category],
			description: s.description,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export type SidebarGroup = {
	category: Category;
	label: string;
	items: { slug: string; name: string; href: string; status: ComponentSpec["status"] }[];
};

export function sidebarGroups(): SidebarGroup[] {
	return CATEGORIES.map((category) => ({
		category,
		label: CATEGORY_LABEL[category],
		// Alphabetical: the sidebar is for finding a known name, not for browsing.
		items: specs
			.filter((s) => s.category === category)
			.map((s) => ({
				slug: s.slug,
				name: s.name,
				href: `/components/${s.category}/${s.slug}`,
				status: s.status,
			}))
			.sort((a, b) => a.name.localeCompare(b.name)),
	})).filter((g) => g.items.length > 0);
}

export function findSpec(category: string, slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug && s.category === category);
}

export type AdjacentComponent = { name: string; href: string };

/** Previous/next in the same order the sidebar lists them: category, then alphabetical. */
export function adjacentComponents(
	category: string,
	slug: string,
): { prev: AdjacentComponent | null; next: AdjacentComponent | null } {
	const flat = sidebarGroups().flatMap((group) =>
		group.items.map((item) => ({ ...item, category: group.category })),
	);
	const index = flat.findIndex(
		(item) => item.category === category && item.slug === slug,
	);
	if (index === -1) return { prev: null, next: null };
	const prev = flat[index - 1];
	const next = flat[index + 1];
	return {
		prev: prev ? { name: prev.name, href: prev.href } : null,
		next: next ? { name: next.name, href: next.href } : null,
	};
}

/** Initial control values, from each prop's declared default. */
export function defaultProps(spec: ComponentSpec): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const prop of spec.props) {
		if (prop.control.kind === "none") continue;
		out[prop.name] =
			prop.default ?? (prop.control.kind === "boolean" ? false : undefined);
	}
	return out;
}
