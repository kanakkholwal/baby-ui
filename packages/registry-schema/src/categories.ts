// Zod-free on purpose: the site's client bundle imports this through `/categories`.
export const CATEGORIES = [
	"base",
	"blocks",
	"advanced",
	"animated",
	"agents",
	"text",
	"backgrounds",
	"charts",
	"og-images",
	"emails",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryInfo = {
	/** Short name for nav, badges and headings. */
	label: string;
	/** Longer heading for link lists such as llms.txt. */
	title: string;
	blurb: string;
	/** `top-level` serves the category at `/<category>`; the rest live under /components. */
	route: "top-level" | "components";
	/** Folder under the consumer's `components/` it installs into. */
	installDir: string;
	/** Hidden from the public registry and production site until launch. */
	preview: boolean;
};

/** Everything the site, registry and scripts know about a category. Add or launch one here. */
export const CATEGORY: Record<Category, CategoryInfo> = {
	base: {
		label: "Base",
		title: "Base components",
		blurb: "The controls every interface needs, with the motion already worked out.",
		route: "components",
		installDir: "ui",
		preview: false,
	},
	blocks: {
		label: "Blocks",
		title: "Blocks",
		blurb: "Whole sections you would otherwise rebuild on every project.",
		route: "components",
		installDir: "blocks",
		preview: false,
	},
	advanced: {
		label: "Advanced",
		title: "Advanced components",
		blurb: "Components with real interaction models behind them.",
		route: "components",
		installDir: "ui",
		preview: false,
	},
	animated: {
		label: "Animated",
		title: "Animated components",
		blurb: "Pieces where the motion is the point.",
		route: "components",
		installDir: "animated",
		preview: false,
	},
	agents: {
		label: "Agents",
		title: "Agent UI components",
		blurb: "Interface parts for products that talk back: messages, tools, reasoning.",
		route: "components",
		installDir: "agents",
		preview: false,
	},
	text: {
		label: "Text",
		title: "Text effects",
		blurb:
			"Copy that moves: reveals, swaps, hovers and loops built for headlines and labels.",
		route: "components",
		installDir: "text",
		preview: false,
	},
	backgrounds: {
		label: "Backgrounds",
		title: "Backgrounds",
		blurb:
			"Full-bleed animated surfaces and canvas effects that idle when nothing moves.",
		route: "components",
		installDir: "backgrounds",
		preview: false,
	},
	charts: {
		label: "Charts",
		title: "Charts",
		blurb:
			"SVG charts on d3 with keyboard, screen-reader and reduced-motion support built in.",
		route: "top-level",
		installDir: "charts",
		preview: false,
	},
	"og-images": {
		label: "OG Images",
		title: "OG image templates",
		blurb:
			"1200x630 social cards built from your theme tokens, rendered to PNG with takumi.",
		route: "top-level",
		installDir: "og",
		preview: false,
	},
	emails: {
		label: "Emails",
		title: "Email templates",
		blurb:
			"Transactional email templates for React Email and Svelte, themed from your tokens, tested for real inboxes.",
		route: "top-level",
		installDir: "emails",
		preview: true,
	},
};

/** Categories served from their own top-level route (`/charts`), not /components. */
export const TOP_LEVEL_CATEGORIES: readonly Category[] = CATEGORIES.filter(
	(c) => CATEGORY[c].route === "top-level",
);

/** Categories still in preview: hidden from the public registry and the production site. */
export const PREVIEW_CATEGORIES: readonly Category[] = CATEGORIES.filter(
	(c) => CATEGORY[c].preview,
);

export const isCategory = (value: string): value is Category =>
	(CATEGORIES as readonly string[]).includes(value);

export function categoryHref(category: Category): string {
	return CATEGORY[category].route === "top-level"
		? `/${category}`
		: `/components/${category}`;
}

/** Site path of a component page. */
export function docsPath(spec: { category: Category; slug: string }): string {
	return `${categoryHref(spec.category)}/${spec.slug}`;
}

/** The category a site path belongs to: `/charts/x` and `/components/base/x` both resolve. */
export function categoryFromPath(pathname: string): Category | undefined {
	const [first, second] = pathname.split("/").filter(Boolean);
	if (first && isCategory(first) && CATEGORY[first].route === "top-level") return first;
	return first === "components" && second && isCategory(second) ? second : undefined;
}

/** Internal route for a top-level category URL (`/charts/x` to `/components/charts/x`). */
export function rerouteTopLevel(pathname: string): string | undefined {
	const [first] = pathname.split("/").filter(Boolean);
	return first && isCategory(first) && CATEGORY[first].route === "top-level"
		? `/components${pathname}`
		: undefined;
}
