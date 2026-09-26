import { defineComponent } from "../index";

const TONES = ["chart", "accent", "violet", "mono"];
const SPEEDS = ["slow", "normal", "fast"];
const POSITIONS = ["absolute", "fixed"];
const union = (values: string[]) => values.map((v) => `"${v}"`).join(" | ");

export const prismGradient = defineComponent({
	slug: "prism-gradient",
	name: "Prism Gradient",
	description: "Swirled prism bands in a WebGL field, coloured from theme tokens.",
	category: "backgrounds",
	status: "stable",
	variants: { tone: TONES, speed: SPEEDS, position: POSITIONS },
	props: [
		{
			name: "tone",
			type: union(TONES),
			description: "Token for the middle band; the ends are background and foreground.",
			default: "chart",
			control: { kind: "select", options: TONES },
		},
		{
			name: "speed",
			type: union(SPEEDS),
			description: "Swirl rate.",
			default: "normal",
			control: { kind: "select", options: SPEEDS },
		},
		{
			name: "position",
			type: union(POSITIONS),
			description: "Fill the nearest positioned parent, or the viewport.",
			default: "absolute",
			control: { kind: "none" },
		},
		{
			name: "grain",
			type: "number",
			description: "Film grain, 0 to 1.",
			default: 0,
			control: { kind: "number", min: 0, max: 1, step: 0.05 },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description: "Content layered above the background.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "One static frame is drawn.",
		behaviour: [
			"The frame loop pauses while the element is off screen or the tab is hidden.",
			"Colours resolve from theme tokens and resample when the theme changes.",
			"Without WebGL, or after a lost context, a token gradient shows instead.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"The canvas and fallback are aria-hidden; children stay in the reading order.",
		],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "PrismGradient",
			files: [
				{ path: "prism-gradient/prism-gradient.tsx", type: "registry:ui" },
				{ path: "prism-gradient/prism.ts", type: "registry:ui" },
				{ path: "prism-gradient/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "PrismGradient",
			files: [
				{ path: "prism-gradient/prism-gradient.svelte", type: "registry:ui" },
				{ path: "prism-gradient/prism.ts", type: "registry:ui" },
				{ path: "prism-gradient/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["background", "prism", "webgl", "shader", "gradient", "swirl", "hero"],
});
