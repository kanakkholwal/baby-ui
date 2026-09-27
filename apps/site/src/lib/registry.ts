// Client-safe: types only from the schema package, whose runtime entry pulls in zod. Anything
// that reads the spec list lives in $lib/server/registry.ts and reaches pages as load data.
import type { Category, ComponentSpec } from "@baby-ui/registry-schema";

/** Marketing count, floored to the ten below with a plus (182 reads "180+"). */
export const componentCountLabel = (count: number) => `${Math.floor(count / 10) * 10}+`;

export const CATEGORY_LABEL: Record<Category, string> = {
	base: "Base",
	blocks: "Blocks",
	advanced: "Advanced",
	animated: "Animated",
	agents: "Agents",
	text: "Text",
	backgrounds: "Backgrounds",
	charts: "Charts",
	"og-images": "OG Images",
	emails: "Emails",
};

export const CATEGORY_BLURB: Record<Category, string> = {
	base: "The controls every interface needs, with the motion already worked out.",
	blocks: "Whole sections you would otherwise rebuild on every project.",
	advanced: "Components with real interaction models behind them.",
	animated: "Pieces where the motion is the point.",
	agents: "Interface parts for products that talk back: messages, tools, reasoning.",
	text: "Copy that moves: reveals, swaps, hovers and loops built for headlines and labels.",
	backgrounds:
		"Full-bleed animated surfaces and canvas effects that idle when nothing moves.",
	charts:
		"SVG charts on d3 with keyboard, screen-reader and reduced-motion support built in.",
	emails:
		"Transactional email templates for React Email and Svelte, themed from your tokens, tested for real inboxes.",
	"og-images":
		"1200x630 social cards built from your theme tokens, rendered to PNG with takumi.",
};

/** Client copy of the schema's `TOP_LEVEL_CATEGORIES`: served at `/<category>`, not /components. */
export const TOP_LEVEL: readonly Category[] = ["charts", "og-images", "emails"];

export function categoryHref(category: Category): string {
	return TOP_LEVEL.includes(category) ? `/${category}` : `/components/${category}`;
}

/** Same as the schema's `docsPath`, kept here so the client never imports the schema runtime. */
export function specHref(spec: Pick<ComponentSpec, "category" | "slug">): string {
	return TOP_LEVEL.includes(spec.category)
		? `/${spec.category}/${spec.slug}`
		: `/components/${spec.category}/${spec.slug}`;
}

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

/** Task-first shelves over existing categories, served at `/<id>`. Items keep their category URL. */
export const COLLECTIONS = {
	data: {
		label: "Data",
		blurb: "Tables, stat cards and trees for products that show numbers and records.",
		slugs: [
			"records-table",
			"filter-table",
			"diff-table",
			"file-tree",
			"stat-card",
			"stat-card-map",
			"usage-card",
			"score-card",
			"status-monitor",
			"github-calendar",
		],
	},
	forms: {
		label: "Forms",
		blurb: "Fields and controls for sign-ups, settings and checkout, keyboard-first.",
		slugs: [
			"input",
			"textarea",
			"label",
			"select",
			"combobox",
			"tag-input",
			"checkbox",
			"radio-group",
			"switch",
			"slider",
			"scrub-field",
			"color-picker",
			"input-otp",
			"calendar",
			"range-calendar",
		],
	},
} as const satisfies Record<
	string,
	{ label: string; blurb: string; slugs: readonly string[] }
>;

export type CollectionId = keyof typeof COLLECTIONS;
export const isCollection = (id: string): id is CollectionId =>
	Object.hasOwn(COLLECTIONS, id);

export type NavLink = { href: string; label: string };
export type NavItem = NavLink & {
	/** Path prefixes that mark this item current. */
	match: string[];
	/** Grouped links shown in a menu instead of navigating on click. */
	menu?: { heading?: string; links: NavLink[] }[];
};

/** The global top-level nav, shared by the header links and the mobile drawer's top row. */
export function siteNav(categories: NavCategory[]): NavItem[] {
	const find = (id: Category) => categories.find((c) => c.category === id);
	const link = (c: NavCategory): NavItem => ({
		href: c.href,
		label: c.label,
		match: [c.href],
	});
	const agents = find("agents");
	const charts = find("charts");
	const templates = categories.filter(
		(c) => c.category === "og-images" || c.category === "emails",
	);
	const rest = categories.filter(
		(c) => !TOP_LEVEL.includes(c.category) && c.category !== "agents",
	);
	return [
		...(agents ? [link(agents)] : []),
		...(Object.keys(COLLECTIONS) as CollectionId[]).map((id) => ({
			href: `/${id}`,
			label: COLLECTIONS[id].label,
			match: [`/${id}`],
		})),
		...(charts ? [link(charts)] : []),
		{
			href: "/components",
			label: "Components",
			match: ["/components", ...templates.map((c) => c.href)],
			menu: [
				{
					links: [
						{ href: "/components", label: "All components" },
						...rest.map((c) => ({ href: c.href, label: c.label })),
					],
				},
				...(templates.length
					? [
							{
								heading: "Templates",
								links: templates.map((c) => ({ href: c.href, label: c.label })),
							},
						]
					: []),
			],
		},
		{ href: "/docs", label: "Docs", match: ["/docs"] },
		...(__SHOW_PRO__
			? [{ href: "/pricing", label: "Pricing", match: ["/pricing"] }]
			: []),
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

/** Initial control values, from each prop's declared default. */
export function defaultProps(
	spec: Pick<ComponentSpec, "props">,
): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const prop of spec.props) {
		if (prop.control.kind === "none") continue;
		out[prop.name] =
			prop.default ?? (prop.control.kind === "boolean" ? false : undefined);
	}
	return out;
}
