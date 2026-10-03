import { defineComponent } from "../index.ts";

const MODES = ["light", "dark"];
const TONES = ["neutral", "chart", "primary"];
const VARIANTS = ["streaks", "showcase", "picker", "screen", "spotlight"];

export const ogLanding = defineComponent({
	slug: "og-landing",
	name: "OG Landing",
	description:
		"A 1200x630 product card: a headline over light streaks, beside screenshot columns or a tilted screen, a word picker, or ringed by portraits.",
	category: "og-images",
	status: "stable",
	isNew: true,
	demo: { mode: "auto", frame: "og" },
	variants: { variant: VARIANTS, mode: MODES, tone: TONES },
	props: [
		{
			name: "title",
			type: "string",
			description: "Headline; the lead word in `picker`. Clamps per layout.",
			required: true,
			control: { kind: "text", placeholder: "Headline" },
		},
		{
			name: "site",
			type: "string",
			description: "Product name beside the logo.",
			control: { kind: "text", placeholder: "Product" },
		},
		{
			name: "logo",
			type: "string",
			description: "Logo image URL. PNG, SVG or WebP.",
			control: { kind: "none" },
		},
		{
			name: "description",
			type: "string",
			description: "Supporting line under the headline; clamps to two lines.",
			control: { kind: "text", placeholder: "Description" },
			showWhen: { variant: ["streaks", "showcase", "screen"] },
		},
		{
			name: "cta",
			type: "string",
			description: "Button label under the lead word.",
			control: { kind: "text", placeholder: "Button" },
			showWhen: { variant: ["picker"] },
		},
		{
			name: "images",
			type: "string[]",
			description:
				"Screenshots for `showcase` and `screen`, portraits for `spotlight`; they repeat to fill.",
			control: { kind: "none" },
		},
		{
			name: "words",
			type: "string[]",
			description:
				"The vertical word list in `picker`; rows fade with distance from the selected one.",
			control: { kind: "none" },
		},
		{
			name: "active",
			type: "number",
			description: "Index of the selected word; defaults to the middle one.",
			control: { kind: "number", min: 0, max: 6 },
			showWhen: { variant: ["picker"] },
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description:
				"Light or dark card, independent of the page theme. Defaults to light.",
			control: { kind: "select", options: MODES },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description:
				"Accent: the closing period and spark, the screen glow, the picker wash and selection. Defaults to neutral.",
			control: { kind: "select", options: TONES },
			showWhen: { variant: ["streaks", "picker", "screen"] },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "The layout around the headline.",
			default: "streaks",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "A static image; nothing moves.",
		behaviour: [
			"Fixed 1200x630 canvas built from flex layout, gradients and theme tokens, so takumi renders it the same as the browser.",
			"`screen` fakes depth with a 2D rotate and skew; the renderer has no 3D transforms.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Rendered to an image: give the meta tag a matching og:image:alt, usually the headline.",
		],
	},
	impl: {
		react: {
			entry: "OgLanding",
			files: [
				{ path: "og-landing/og-landing.tsx", type: "registry:ui" },
				{ path: "og-landing/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "OgLanding",
			files: [
				{ path: "og-landing/og-landing.svelte", type: "registry:ui" },
				{ path: "og-landing/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: [
		"og",
		"open graph",
		"social card",
		"landing",
		"product",
		"hero",
		"takumi",
		"image",
	],
});
