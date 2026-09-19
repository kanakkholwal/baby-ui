import type { Category, ComponentSpec } from "@baby-ui/registry-schema";
import { CATEGORIES } from "@baby-ui/registry-schema";
import { specs } from "@baby-ui/registry-schema/components";

export const CATEGORY_LABEL: Record<Category, string> = {
	base: "Base",
	boilerplate: "Boilerplate",
	advanced: "Advanced",
	animated: "Animated",
};

export type SidebarGroup = {
	category: Category;
	label: string;
	items: { slug: string; name: string; href: string; status: ComponentSpec["status"] }[];
};

export function sidebarGroups(): SidebarGroup[] {
	return CATEGORIES.map((category) => ({
		category,
		label: CATEGORY_LABEL[category],
		items: specs
			.filter((s) => s.category === category)
			.map((s) => ({
				slug: s.slug,
				name: s.name,
				href: `/components/${s.category}/${s.slug}`,
				status: s.status,
			})),
	})).filter((g) => g.items.length > 0);
}

export function findSpec(category: string, slug: string): ComponentSpec | undefined {
	return specs.find((s) => s.slug === slug && s.category === category);
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
