import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];
const MOTIONS = ["slide", "flip"];

export const swapText = defineComponent({
	slug: "swap-text",
	name: "Swap Text",
	description: "Swaps between two texts on click or hover.",
	category: "text",
	status: "stable",
	variants: { size: SIZES, motion: MOTIONS },
	props: [
		{
			name: "initialText",
			type: "string",
			description: "Text shown when inactive.",
			control: { kind: "text" },
			default: "Hover me",
		},
		{
			name: "finalText",
			type: "string",
			description: "Text shown when active.",
			control: { kind: "text" },
			default: "Click me",
		},
		{
			name: "active",
			type: "boolean",
			description: "Controlled: which text is showing. Omit to let the component own it.",
			control: { kind: "none" },
		},
		{
			name: "defaultActive",
			type: "boolean",
			description: "Uncontrolled starting state.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onActiveChange",
			type: "(active: boolean) => void",
			description: "Fired when a click toggles the text; hover swaps are visual only.",
			control: { kind: "none" },
		},
		{
			name: "supportsHover",
			type: "boolean",
			description: "Also toggle on hover, not just click.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "disableClick",
			type: "boolean",
			description: "Disable the click toggle (e.g. when driven purely by `active`).",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the swap takes; for `flip`, each letter turns in 40% of it.",
			default: 1000,
			control: { kind: "number", min: 200, max: 2000, step: 50 },
		},
		{
			name: "motion",
			type: MOTIONS.map((v) => `"${v}"`).join(" | "),
			description:
				"Slide lifts one text out and the other in; flip turns each letter over in 3D, one after another.",
			default: "slide",
			control: { kind: "select", options: MOTIONS },
		},
		{
			name: "staggerMs",
			type: "number",
			description: "Delay between neighbouring letters for `flip`.",
			default: 44,
			control: { kind: "number", min: 0, max: 120, step: 4 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale.",
			default: "lg",
			control: { kind: "select", options: SIZES },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The swap still happens, just without the travel.",
		behaviour: [
			"Slide: both texts sit in a fixed-height stack; the active one slides up and out, the other slides up into view.",
			"Flip: letters tip away one by one while the next word's letters turn up behind them; turning off replays it right to left.",
		],
	},
	a11y: {
		notes: [
			"A real `<button>`; toggling is reachable by keyboard (Enter/Space) even when `supportsHover` is off.",
			"The visual layers are aria-hidden in both modes; the button is named by whichever text is showing and reports aria-pressed.",
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
			entry: "SwapText",
			files: [
				{ path: "swap-text/swap-text.tsx", type: "registry:ui" },
				{ path: "swap-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "SwapText",
			files: [
				{ path: "swap-text/swap-text.svelte", type: "registry:ui" },
				{ path: "swap-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "swap", "toggle", "hover", "click"],
});
