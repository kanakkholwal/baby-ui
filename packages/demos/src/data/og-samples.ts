const VIBRANT = "https://cdn.vibrant.design/favicons";
// Simple Icons serves one glyph per brand; a trailing colour recolours it (CORS-enabled).
const brand = (slug: string, colour?: string) =>
	`https://cdn.simpleicons.org/${slug}${colour ? `/${colour}` : ""}`;
const lucide = (name: string) =>
	`https://unpkg.com/lucide-static@0.544.0/icons/${name}.svg`;
// randomuser.me rather than pravatar: the browser renderer's wsrv.nl fallback refuses pravatar.
const portrait = (kind: "men" | "women", n: number) =>
	`https://randomuser.me/api/portraits/${kind}/${n}.jpg`;

const CODE_SVELTE = [
	'import { Dialog } from "#lib/ui/dialog";',
	"",
	"// grows from the trigger edge",
	"<Dialog>",
	"  <DialogTrigger>Open</DialogTrigger>",
	"  <DialogContent>",
	"    <DialogTitle>Invite</DialogTitle>",
	"  </DialogContent>",
];

export const OG_DOCS_SNIPPETS = {
	svelte: {
		code: CODE_SVELTE,
		filename: "dialog.svelte",
		shell: [
			"$ pnpm dlx shadcn-svelte add @baby-ui/dialog",
			"resolving registry item",
			"wrote lib/components/ui/dialog",
			"",
			"$ pnpm dev",
			"ready on localhost:5173",
		],
	},
	react: {
		code: CODE_SVELTE.map((line, i) =>
			i === 0 ? 'import { Dialog } from "@/ui/dialog";' : line,
		),
		filename: "dialog.tsx",
		shell: [
			"$ pnpm dlx shadcn add @baby-ui/dialog",
			"resolving registry item",
			"wrote components/ui/dialog",
			"",
			"$ pnpm dev",
			"ready on localhost:5173",
		],
	},
};

export const OG_BLOG_POST = {
	author: { name: "Kanak Kholwal", avatar: portrait("men", 32) },
	date: "Sep 26, 2026",
	readingTime: "6 min read",
};

// Variants studied from a real brand's card preview with that brand, as credit.
const BLOG_POST_BY_VARIANT: Record<string, Record<string, unknown>> = {
	default: {
		site: "baby ui",
		title: "Designing motion that respects the reader",
		excerpt:
			"Exits mirror entrances, springs settle fast, and reduced motion gets its own path.",
		category: "Engineering",
	},
	cover: {
		site: "neatlogs",
		logo: `${VIBRANT}/sc4vnni.png`,
		category: "Your agent is already running.",
		title: "That’s not the same as working",
		excerpt: "neatlogs finds what’s failing, works out why, and hands you a fix.",
		cover: "https://picsum.photos/seed/fogline/1200/720?grayscale",
	},
};

export const OG_DOCS_PAGE = {
	section: ["Docs", "Components", "Overlays"],
	snippet: OG_DOCS_SNIPPETS.svelte.code,
	filename: OG_DOCS_SNIPPETS.svelte.filename,
};

export const OG_CHANGELOG = {
	highlights: [
		{ kind: "added" as const, text: "Eleven d3 charts with full keyboard navigation" },
		{ kind: "changed" as const, text: "Dialogs grow from the trigger edge" },
		{ kind: "fixed" as const, text: "Sheet backdrop stacking on sibling panels" },
	],
};

export const OG_GITHUB_REPO = {
	avatar: portrait("men", 45),
	stars: "12.4k",
	forks: "684",
	issues: "23",
	contributors: [12, 44, 21, 68, 9].map((n, i) => portrait(i % 2 ? "women" : "men", n)),
	contributorCount: "+128",
};

export const OG_NEWSLETTER_ISSUE = {
	inside: [
		"Springs that settle in under 300ms",
		"The case against one-off colour tokens",
		"Reader mail: dark mode without a second palette",
	],
};

const pics = (seed: string, count: number, w = 640, h = 640) =>
	Array.from(
		{ length: count },
		(_, i) => `https://picsum.photos/seed/${seed}${i}/${w}/${h}`,
	);

// Templates studied from a real brand's card preview ship with that brand as the sample, as credit.
export const OG_SOFT_FOCUS = { logo: `${VIBRANT}/bpk06v7.png` };

export const OG_SCATTER = { logo: `${VIBRANT}/8y0lmgf.png`, images: pics("spark", 7) };

export const OG_SPLIT = {
	logo: `${VIBRANT}/kww0c0w.png`,
	image: "https://picsum.photos/seed/melius/900/900",
};

export const OG_SHOWCASE = {
	logo: `${VIBRANT}/1uesj9u.png`,
	images: pics("mobbin", 6, 420, 600),
};

export const OG_TILTED_SCREEN = {
	logo: `${VIBRANT}/wp91sx3.svg`,
	image: "https://picsum.photos/seed/shaders/1400/900",
};

export const OG_SPOTLIGHT = {
	logo: `${VIBRANT}/hm5yvaq.png`,
	images: [5, 9, 12, 16, 20, 25, 32, 44].map((n, i) =>
		portrait(i % 2 ? "men" : "women", n),
	),
};

export const OG_EDITORIAL_BIO = {
	lines: [
		"is an Estonian",
		"interaction",
		"designer",
		"working with Vercel",
		"and Devouring Details",
	],
};

function byVariant(
	table: Record<string, Record<string, unknown>>,
	props: Record<string, unknown>,
): Record<string, unknown> {
	return table[String(props.variant ?? "default")] ?? table.default ?? {};
}

/** Sample props that follow a control value, so the PNG endpoint matches the demo. */
export const OG_SAMPLE_BY_PROPS: Record<
	string,
	(props: Record<string, unknown>) => Record<string, unknown>
> = {
	"og-blog-post": (props) => byVariant(BLOG_POST_BY_VARIANT, props),
	"og-wordmark": (props) =>
		props.mode === "dark"
			? { name: "Cursor", logo: `${VIBRANT}/kjqdvvk.png` }
			: { name: "Natural" },
	"og-statement": (props) => ({
		logo: brand("figma", props.mode === "dark" ? "white" : undefined),
	}),
	"og-guides": (props) => ({
		logo: brand("shadcnui", props.mode === "light" ? "black" : "white"),
	}),
	"og-paper-window": (props) => ({
		logo: brand("notion", props.mode === "dark" ? "white" : undefined),
	}),
	"og-hairlines": (props) => ({
		logo: brand("nextdotjs", props.mode === "dark" ? "white" : undefined),
	}),
	"og-halo": (props) => ({
		logo: brand("vercel", props.mode === "light" ? "white" : "black"),
	}),
	"og-docs-page": (props) =>
		props.motif === "terminal"
			? { snippet: OG_DOCS_SNIPPETS.svelte.shell, filename: "zsh" }
			: {},
};

export const OG_PRODUCT_LAUNCH = {
	brand: "Acme",
	screenshot: "https://picsum.photos/id/180/1320/960",
};

export const OG_PRICING = {
	features: [
		"Unlimited projects",
		"Priority support",
		"SSO and audit logs",
		"10 TB bandwidth",
	],
	note: "Billed yearly. Cancel anytime.",
	brand: "Acme",
};

export const OG_JOB_POSTING = {
	logo: portrait("men", 30),
};

export const OG_PODCAST_EPISODE = {
	cover: "https://picsum.photos/id/1082/800/800",
	guest: { name: "Ada Park", avatar: portrait("women", 32) },
};

export const OG_PRODUCT_SHOP = {
	image: "https://picsum.photos/id/21/800/800",
	store: "Acme",
};

export const OG_TESTIMONIAL = {
	author: {
		name: "Maya Chen",
		role: "Head of Design",
		avatar: portrait("women", 47),
	},
};

export const OG_STATS_METRICS = {
	stats: [
		{ label: "Quarterly revenue", value: "$1.2M", delta: "+18%", trend: "up" as const },
		{ label: "active users", value: "48.3k" },
		{ label: "NPS", value: "64" },
	],
	sparkline: [12, 15, 14, 19, 22, 21, 26, 30, 29, 35, 38, 44],
};

export const OG_CTA_PILL = { logo: brand("cloudflare", "white") };
export const OG_PROMPT = { logo: brand("replit") };
export const OG_PROMPT_PHOTO = {
	image: "https://picsum.photos/id/1056/1400/900",
	chips: ["Template", "Blocks", "Vite + React"],
};
export const OG_PAPER_WINDOW = {
	logo: brand("notion"),
	image: "https://picsum.photos/id/1032/1400/900",
};
export const OG_STATEMENT = { logo: brand("figma") };
export const OG_GUIDES = { logo: brand("shadcnui", "white") };
export const OG_HALO = { logo: brand("vercel", "black") };
export const OG_TAGLINE = { logo: brand("supabase") };
export const OG_HAIRLINES = { logo: brand("nextdotjs") };
export const OG_APP_TILE = { logo: brand("raycast") };
export const OG_APP_ICON = { logo: brand("linear", "white") };
export const OG_BIG_ICON = {
	logo: brand("lucide"),
	icon: lucide("ghost"),
	pattern: [
		"search",
		"bell",
		"camera",
		"heart",
		"folder",
		"calendar",
		"map-pin",
		"settings",
	].map(lucide),
};

export const OG_SAMPLES: Record<string, Record<string, unknown>> = {
	"og-app-icon": OG_APP_ICON,
	"og-app-tile": OG_APP_TILE,
	"og-big-icon": OG_BIG_ICON,
	"og-blog-post": OG_BLOG_POST,
	"og-changelog": OG_CHANGELOG,
	"og-cta-pill": OG_CTA_PILL,
	"og-docs-page": OG_DOCS_PAGE,
	"og-editorial-bio": OG_EDITORIAL_BIO,
	"og-github-repo": OG_GITHUB_REPO,
	"og-guides": OG_GUIDES,
	"og-hairlines": OG_HAIRLINES,
	"og-halo": OG_HALO,
	"og-job-posting": OG_JOB_POSTING,
	"og-newsletter-issue": OG_NEWSLETTER_ISSUE,
	"og-paper-window": OG_PAPER_WINDOW,
	"og-podcast-episode": OG_PODCAST_EPISODE,
	"og-pricing": OG_PRICING,
	"og-product-launch": OG_PRODUCT_LAUNCH,
	"og-product-shop": OG_PRODUCT_SHOP,
	"og-prompt": OG_PROMPT,
	"og-prompt-photo": OG_PROMPT_PHOTO,
	"og-scatter": OG_SCATTER,
	"og-showcase": OG_SHOWCASE,
	"og-soft-focus": OG_SOFT_FOCUS,
	"og-split": OG_SPLIT,
	"og-spotlight": OG_SPOTLIGHT,
	"og-statement": OG_STATEMENT,
	"og-stats-metrics": OG_STATS_METRICS,
	"og-tagline": OG_TAGLINE,
	"og-testimonial": OG_TESTIMONIAL,
	"og-tilted-screen": OG_TILTED_SCREEN,
};
