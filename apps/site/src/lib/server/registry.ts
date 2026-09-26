import { CATEGORIES, type Category, type ComponentSpec } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";
import {
	type AdjacentComponent,
	CATEGORY_LABEL,
	type CardItem,
	type CatalogItem,
	categoryHref,
	defaultProps,
	type NavCategory,
	type SidebarGroup,
	specHref,
} from "$lib/registry";

export { specs };

/** Categories with at least one component, in schema order. */
export function navCategories(): NavCategory[] {
	return CATEGORIES.flatMap((category) => {
		const count = specs.filter((s) => s.category === category).length;
		return count
			? [
					{
						category,
						label: CATEGORY_LABEL[category],
						href: categoryHref(category),
						count,
					},
				]
			: [];
	});
}

export function catalog(): CatalogItem[] {
	return specs.map((s) => ({
		slug: s.slug,
		name: s.name,
		category: s.category,
		description: s.description,
		keywords: s.keywords,
		href: specHref(s),
	}));
}

export function cardItem(spec: ComponentSpec): CardItem {
	return {
		slug: spec.slug,
		name: spec.name,
		description: spec.description,
		href: specHref(spec),
		defaults: defaultProps(spec),
	};
}

/** Card data for the given slugs, in the order given; unknown slugs are dropped. */
export function cardItems(slugs: string[]): CardItem[] {
	return slugs.flatMap((slug) => {
		const spec = specs.find((s) => s.slug === slug);
		return spec ? [cardItem(spec)] : [];
	});
}

/** Every category, with `lead` (the route's own category) moved to the front. */
export function sidebarGroups(lead?: Category): SidebarGroup[] {
	return [...CATEGORIES]
		.sort((a, b) => Number(b === lead) - Number(a === lead))
		.map((category) => ({
			category,
			label: CATEGORY_LABEL[category],
			// Alphabetical: the sidebar is for finding a known name, not for browsing.
			items: specs
				.filter((s) => s.category === category)
				.map((s) => ({
					slug: s.slug,
					name: s.name,
					href: specHref(s),
					status: s.status,
				}))
				.sort((a, b) => a.name.localeCompare(b.name)),
		}))
		.filter((g) => g.items.length > 0);
}

export function findSpec(category: string, slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug && s.category === category);
}

/** Previous/next in the same order the sidebar lists them: category, then alphabetical. */
export function adjacentComponents(
	category: string,
	slug: string,
): { prev: AdjacentComponent | null; next: AdjacentComponent | null } {
	const flat = sidebarGroups(category as Category).flatMap((group) =>
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
