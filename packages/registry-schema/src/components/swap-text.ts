import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const swapText = defineComponent({
	slug: "swap-text",
	name: "Swap Text",
	description: "Swaps between two texts on click or hover.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
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
			description: "Fired on click or hover toggle.",
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
			description: "How long the swap slide takes.",
			default: 1000,
			control: { kind: "number", min: 200, max: 2000, step: 50 },
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
			"Both texts sit in a fixed-height stack; the active one slides up and out, the other slides up into view.",
		],
	},
	a11y: {
		notes: [
			"A real `<button>`; toggling is reachable by keyboard (Enter/Space) even when `supportsHover` is off.",
		],
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
