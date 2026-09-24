import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const textFlip = defineComponent({
	slug: "text-flip",
	name: "Text Flip",
	description:
		"A fixed label with a word stack that flips to the next word on an interval.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "label",
			type: "string",
			description: 'Fixed leading label, e.g. "Coding is".',
			control: { kind: "text" },
			default: "Coding is",
		},
		{
			name: "words",
			type: "string[]",
			description: "Words that cycle after the label, looping back to the first.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "index",
			type: "number",
			description: "Controlled: which word is showing. Omit to let the component flip.",
			control: { kind: "none" },
		},
		{
			name: "defaultIndex",
			type: "number",
			description: "Uncontrolled starting index.",
			default: 0,
			control: { kind: "number", min: 0, max: 3, step: 1 },
		},
		{
			name: "onIndexChange",
			type: "(index: number) => void",
			description: "Fired every time the shown word changes.",
			control: { kind: "none" },
		},
		{
			name: "intervalMs",
			type: "number",
			description: "Time each word holds before flipping. Only runs while uncontrolled.",
			default: 2000,
			control: { kind: "number", min: 500, max: 5000, step: 100 },
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
		reducedMotion: "Words still switch, just without the slide.",
		behaviour: [
			"The stack slides up one line per word on --duration-overlay and --ease-out.",
			"Wrapping rolls onto a copy of the first word, then snaps back to the real one with the transition off.",
		],
	},
	a11y: {
		notes: ["The moving stack is hidden; an sr-only span carries the current word."],
	},

	impl: {
		react: {
			entry: "TextFlip",
			files: [
				{ path: "text-flip/text-flip.tsx", type: "registry:ui" },
				{ path: "text-flip/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TextFlip",
			files: [
				{ path: "text-flip/text-flip.svelte", type: "registry:ui" },
				{ path: "text-flip/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "flip", "cycle", "loop"],
});
