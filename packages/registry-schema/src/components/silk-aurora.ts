import { defineComponent } from "../index";

const TONES = ["pearl", "chart", "violet"];
const SPEEDS = ["slow", "normal", "fast"];
const POSITIONS = ["absolute", "fixed"];

export const silkAurora = defineComponent({
	slug: "silk-aurora",
	name: "Silk Aurora",
	description:
		"Three soft silk ribbons with a pearlescent sheen, drawn in WebGL from theme tokens.",
	category: "backgrounds",
	status: "stable",
	variants: { tone: TONES, speed: SPEEDS, position: POSITIONS },
	props: [
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description: "Token pair for the sheen and accent ribbons.",
			default: "pearl",
			control: { kind: "select", options: TONES },
		},
		{
			name: "speed",
			type: SPEEDS.map((v) => `"${v}"`).join(" | "),
			description: "Ribbon drift rate.",
			default: "normal",
			control: { kind: "select", options: SPEEDS },
		},
		{
			name: "position",
			type: POSITIONS.map((v) => `"${v}"`).join(" | "),
			description: "Fill the nearest positioned parent, or the viewport.",
			default: "absolute",
			control: { kind: "none" },
		},
		{
			name: "intensity",
			type: "number",
			description: "Ribbon and sheen strength, 0 to 2.",
			default: 1,
			control: { kind: "number", min: 0, max: 2, step: 0.1 },
		},
		{
			name: "grain",
			type: "number",
			description: "Film grain, 0 to 1.",
			default: 0.85,
			control: { kind: "number", min: 0, max: 1, step: 0.05 },
		},
		{
			name: "interactive",
			type: "boolean",
			description: "Ribbons lean toward the pointer, which lifts a soft sheen.",
			default: true,
			control: { kind: "boolean" },
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
		reducedMotion: "One static frame is drawn and the pointer has no effect.",
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
			entry: "SilkAurora",
			files: [
				{ path: "silk-aurora/silk-aurora.tsx", type: "registry:ui" },
				{ path: "silk-aurora/silk.ts", type: "registry:ui" },
				{ path: "silk-aurora/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "SilkAurora",
			files: [
				{ path: "silk-aurora/silk-aurora.svelte", type: "registry:ui" },
				{ path: "silk-aurora/silk.ts", type: "registry:ui" },
				{ path: "silk-aurora/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["background", "aurora", "silk", "webgl", "shader", "hero"],
});
