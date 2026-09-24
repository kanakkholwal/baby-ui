import { defineComponent } from "../index";

const DIRECTIONS = ["ltr", "rtl"];

export const logoCarousel = defineComponent({
	slug: "logo-carousel",
	name: "Logo Carousel",
	description:
		"Columns of logos that cycle independently, staggered slide-and-fade per column.",
	category: "blocks",
	status: "stable",
	props: [
		{
			name: "children",
			type: "ReactNode",
			description:
				"Each child is one logo; distributed round-robin across `columnCount` columns.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "columnCount",
			type: "number",
			description: "How many columns to split the logos into.",
			default: 4,
			control: { kind: "number", min: 1, max: 8, step: 1 },
		},
		{
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description: "Which edge the per-column stagger counts from.",
			default: "ltr",
			control: { kind: "select", options: DIRECTIONS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Each column shows its current logo with no slide, fade, or stagger.",
		behaviour: [
			"Every 1.6s, each column advances to its next logo: the outgoing logo slides up and fades out while the incoming one slides up and fades in from below, staggered 125ms per column.",
			"Paused while the carousel is scrolled out of view, the browser tab is hidden, or the page itself isn't visible, so it never animates unseen.",
			"The very first logo in each column appears instantly, with no entrance animation, only later cycles animate.",
		],
	},
	a11y: {
		notes: [
			"Purely decorative motion; the visible logo is the only one exposed at a time; hidden outgoing/incoming layers carry no separate accessible content.",
		],
	},
	impl: {
		react: {
			entry: "LogoCarousel",
			files: [
				{ path: "logo-carousel/logo-carousel.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "LogoCarousel",
			files: [
				{ path: "logo-carousel/logo-carousel.svelte", type: "registry:ui" },
				{ path: "logo-carousel/logo-column.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["logo", "carousel", "marquee", "cycle", "marketing", "social proof"],
});
