import { defineComponent } from "../index";

const LAYOUTS = ["single", "double"];
const DIRECTIONS = ["left", "right"];
const SIZES = ["sm", "md", "lg"];

export const scrollVelocity = defineComponent({
	slug: "scroll-velocity",
	name: "Scroll Velocity",
	description:
		"Marquee rows that drift at rest, speed up as the page scrolls and flip direction with it.",
	category: "text",
	status: "stable",
	variants: { layout: LAYOUTS, direction: DIRECTIONS, size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The phrase each row repeats; read once by screen readers.",
			default: "Scroll to speed me up",
			control: { kind: "text" },
		},
		{
			name: "layout",
			type: LAYOUTS.map((v) => `"${v}"`).join(" | "),
			description: "Two rows drifting against each other, or one band.",
			default: "double",
			control: { kind: "select", options: LAYOUTS },
		},
		{
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description:
				"Which way the first row drifts at rest; scrolling up reverses every row.",
			default: "left",
			control: { kind: "select", options: DIRECTIONS },
		},
		{
			name: "durationS",
			type: "number",
			description: "Seconds for one full loop at rest.",
			default: 30,
			control: { kind: "number", min: 5, max: 90, step: 5 },
		},
		{
			name: "boost",
			type: "number",
			description:
				"Extra speed per 1000 px/s of scroll, as a multiple of the resting speed.",
			default: 5,
			control: { kind: "number", min: 0, max: 12, step: 1 },
		},
		{
			name: "repeat",
			type: "number",
			description: "Copies of `text` in each half of a row; raise it for short phrases.",
			default: 4,
			control: { kind: "none" },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The rows stand still; scrolling does nothing.",
		behaviour: [
			"Each row is a CSS keyframe loop over two identical halves, so the resting drift runs on the compositor.",
			"Scroll only changes each animation's playbackRate, which keeps the position continuous; the rate eases back to 1 after scrolling stops.",
		],
	},
	a11y: {
		keyboard: [],
		notes: ["The rows are aria-hidden; a visually hidden copy carries the text once."],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "ScrollVelocity",
			files: [
				{ path: "scroll-velocity/scroll-velocity.tsx", type: "registry:ui" },
				{ path: "scroll-velocity/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "ScrollVelocity",
			files: [
				{ path: "scroll-velocity/scroll-velocity.svelte", type: "registry:ui" },
				{ path: "scroll-velocity/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["marquee", "scroll", "velocity", "ticker", "text"],
});
