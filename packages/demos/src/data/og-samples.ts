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

const AUTHOR_PROFILE_BY_VARIANT: Record<string, Record<string, unknown>> = {
	default: {
		name: "Ada Park",
		role: "Staff Engineer at Acme",
		bio: "Writes about design systems, motion and the craft of shipping small, sharp tools.",
		handle: "@adapark",
		site: "baby ui",
		avatar: "https://i.pravatar.cc/320?img=47",
		stats: [
			{ value: "128", label: "Posts" },
			{ value: "12.4k", label: "Followers" },
			{ value: "4.2M", label: "Reads" },
		],
	},
	pass: {
		name: "Mike Barton",
		role: "Software Designer",
		label: "Passenger",
		site: "Northern Air",
		handle: "Shaping the journey",
		avatar: `${VIBRANT}/r1lvryz.svg`,
		stats: [
			{ value: "TD18", label: "Flight" },
			{ value: "MAN", label: "From" },
			{ value: "SFO", label: "To" },
		],
		tone: "chart",
	},
	editorial: {
		name: "Rauno Freiberg",
		bio: "is an Estonian\ninteraction\ndesigner\nworking with Vercel\nand Devouring Details",
		tone: "chart",
	},
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

const BRAND_BY_VARIANT: Record<string, Record<string, unknown>> = {
	plain: { name: "Natural", mode: "light" },
	waves: { name: "ElevenLabs", logo: `${VIBRANT}/oxccwur.png` },
	pipes: { name: "Wavelength", logo: `${VIBRANT}/20qqhh6.png`, mode: "dark" },
	mesh: { name: "stripe", logo: `${VIBRANT}/60feg2b.svg` },
	blur: { name: "Polar", logo: `${VIBRANT}/bpk06v7.png` },
	scatter: {
		name: "lightspark",
		logo: `${VIBRANT}/8y0lmgf.png`,
		images: pics("spark", 7),
	},
	mosaic: {
		name: "Framer",
		logo: "https://cdn.vibrant.design/project-avatars/alxad4v/5236660cac1b1ee19640.webp",
		images: pics("frame", 14, 480, 560),
		mode: "dark",
	},
	split: {
		name: "Melius",
		logo: `${VIBRANT}/kww0c0w.png`,
		images: pics("melius", 1, 900, 900),
		mode: "dark",
	},
};

const LANDING_BY_VARIANT: Record<string, Record<string, unknown>> = {
	streaks: {
		site: "Axiom",
		title: "The modern machine data platform",
		mode: "dark",
		tone: "chart",
	},
	showcase: {
		logo: `${VIBRANT}/1uesj9u.png`,
		title: "Never run out of design inspiration again.",
		images: pics("mobbin", 6, 420, 600),
	},
	picker: {
		site: "Shotbase",
		logo: `${VIBRANT}/965gn46.png`,
		title: "Beautiful",
		words: ["Web pages", "Screenshots", "Captures", "Recordings", "Sharing"],
		cta: "Download for Mac",
		mode: "dark",
		tone: "primary",
	},
	screen: {
		site: "shaders",
		logo: `${VIBRANT}/wp91sx3.svg`,
		title: "The design platform for web shaders",
		description:
			"Ship creative frontend effects with a component library and a design editor.",
		images: pics("shaders", 1, 1400, 900),
		mode: "dark",
		tone: "primary",
	},
	spotlight: {
		site: "Skydive",
		logo: `${VIBRANT}/hm5yvaq.png`,
		title: "Agents that live in the cloud",
		images: [5, 9, 12, 16, 20, 25, 32, 44].map(
			(n) => `https://i.pravatar.cc/240?img=${n}`,
		),
	},
};

function brandSample(props: Record<string, unknown>): Record<string, unknown> {
	if ((props.variant ?? "plain") === "plain" && props.mode === "dark")
		return { name: "Cursor", logo: `${VIBRANT}/kjqdvvk.png` };
	return byVariant(BRAND_BY_VARIANT, { variant: props.variant ?? "plain" });
}

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
	"og-author-profile": (props) => byVariant(AUTHOR_PROFILE_BY_VARIANT, props),
	"og-blog-post": (props) => byVariant(BLOG_POST_BY_VARIANT, props),
	"og-brand": brandSample,
	"og-landing": (props) =>
		byVariant(LANDING_BY_VARIANT, { variant: props.variant ?? "streaks" }),
	"og-docs-page": (props) =>
		props.motif === "terminal"
			? { snippet: OG_DOCS_SNIPPETS.svelte.shell, filename: "zsh" }
			: {},
};

export const OG_SAMPLES: Record<string, Record<string, unknown>> = {
	"og-blog-post": OG_BLOG_POST,
	"og-changelog": OG_CHANGELOG,
	"og-docs-page": OG_DOCS_PAGE,
	"og-github-repo": OG_GITHUB_REPO,
	"og-newsletter-issue": OG_NEWSLETTER_ISSUE,
};
