const VIBRANT = "https://cdn.vibrant.design/favicons";

const CODE_SVELTE = [
	'import { Dialog } from "$lib/ui/dialog";',
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
	author: { name: "Kanak Kholwal", avatar: "https://i.pravatar.cc/160?img=12" },
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
	avatar: "https://i.pravatar.cc/120?img=15",
	stars: "12.4k",
	forks: "684",
	issues: "23",
	contributors: [3, 5, 8, 12, 16].map((n) => `https://i.pravatar.cc/120?img=${n}`),
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
	images: [5, 9, 12, 16, 20, 25, 32, 44].map((n) => `https://i.pravatar.cc/240?img=${n}`),
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
	logo: "https://i.pravatar.cc/160?img=30",
};

export const OG_PODCAST_EPISODE = {
	cover: "https://picsum.photos/id/1082/800/800",
	guest: { name: "Ada Park", avatar: "https://i.pravatar.cc/160?img=32" },
};

export const OG_PRODUCT_SHOP = {
	image: "https://picsum.photos/id/21/800/800",
	store: "Northwind",
};

export const OG_TESTIMONIAL = {
	author: {
		name: "Maya Chen",
		role: "Head of Design",
		avatar: "https://i.pravatar.cc/200?img=47",
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

export const OG_SAMPLES: Record<string, Record<string, unknown>> = {
	"og-blog-post": OG_BLOG_POST,
	"og-changelog": OG_CHANGELOG,
	"og-docs-page": OG_DOCS_PAGE,
	"og-editorial-bio": OG_EDITORIAL_BIO,
	"og-github-repo": OG_GITHUB_REPO,
	"og-job-posting": OG_JOB_POSTING,
	"og-newsletter-issue": OG_NEWSLETTER_ISSUE,
	"og-podcast-episode": OG_PODCAST_EPISODE,
	"og-pricing": OG_PRICING,
	"og-product-launch": OG_PRODUCT_LAUNCH,
	"og-product-shop": OG_PRODUCT_SHOP,
	"og-scatter": OG_SCATTER,
	"og-showcase": OG_SHOWCASE,
	"og-soft-focus": OG_SOFT_FOCUS,
	"og-split": OG_SPLIT,
	"og-spotlight": OG_SPOTLIGHT,
	"og-stats-metrics": OG_STATS_METRICS,
	"og-testimonial": OG_TESTIMONIAL,
	"og-tilted-screen": OG_TILTED_SCREEN,
};
