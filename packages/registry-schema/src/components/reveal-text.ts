import { defineComponent } from "../index";

const SIZES = ["inherit", "sm", "md", "lg"];
const SPLITS = ["word", "char"];
const TRIGGERS = ["mount", "view"];

export const revealText = defineComponent({
	slug: "reveal-text",
	name: "Reveal Text",
	description:
		"Words or letters rise out of a blur one after another, on mount or in view.",
	category: "text",
	status: "stable",
	variants: { split: SPLITS, trigger: TRIGGERS, size: SIZES },
	props: [
		{
			name: "text",
			type: "string | string[]",
			description: "One string, or one per line.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "split",
			type: SPLITS.map((v) => `"${v}"`).join(" | "),
			description: "Stagger by word or by letter.",
			default: "word",
			control: { kind: "select", options: SPLITS },
		},
		{
			name: "trigger",
			type: TRIGGERS.map((v) => `"${v}"`).join(" | "),
			description: "Reveal on mount, or when scrolled into view.",
			default: "mount",
			control: { kind: "select", options: TRIGGERS },
		},
		{
			name: "once",
			type: "boolean",
			description: 'With trigger="view": reveal only the first time.',
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "revealed",
			type: "boolean",
			description: "Controlled: whether the text shows. Omit to follow trigger.",
			control: { kind: "none" },
		},
		{
			name: "onRevealedChange",
			type: "(revealed: boolean) => void",
			description: "Fired when the trigger reveals or hides the text.",
			control: { kind: "none" },
		},
		{
			name: "staggerMs",
			type: "number",
			description: "Gap between units.",
			default: 90,
			control: { kind: "number", min: 10, max: 300, step: 10 },
		},
		{
			name: "delayMs",
			type: "number",
			description: "Wait before the first unit.",
			default: 0,
			control: { kind: "number", min: 0, max: 1000, step: 50 },
		},
		{
			name: "blur",
			type: "number",
			description: "Starting blur in px; skipped on touch screens.",
			default: 12,
			control: { kind: "number", min: 0, max: 24, step: 2 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale; inherit takes the surrounding text size.",
			default: "inherit",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "as",
			type: "string",
			description: "Element to render.",
			default: "span",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Units only fade, over 250ms, with a third of the stagger.",
		behaviour: [
			"Each unit rises 40% of its height, fades in and unblurs over 900ms on cubic-bezier(0.16, 1, 0.3, 1), 90ms after the one before.",
			"Leaving view with once off hides the text instantly so the next entry replays.",
		],
	},
	a11y: {
		notes: ["Screen readers get the whole text once; the split units are hidden."],
	},
	licenseOrigin: {
		source: "iconiq",
		url: "https://iconiqui.com",
		license: "MIT",
		copyright: "Copyright (c) 2024-2026 Edwin Vakayil",
	},
	impl: {
		react: {
			entry: "RevealText",
			files: [
				{ path: "reveal-text/reveal-text.tsx", type: "registry:ui" },
				{ path: "reveal-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "RevealText",
			files: [
				{ path: "reveal-text/reveal-text.svelte", type: "registry:ui" },
				{ path: "reveal-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["reveal", "stagger", "blur", "scroll", "words", "letters"],
});
