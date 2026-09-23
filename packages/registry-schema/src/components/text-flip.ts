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
			control: { kind: "none" },
		},
		{
			name: "intervalMs",
			type: "number",
			description: "Time each word holds before flipping to the next.",
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
			"The word stack steps up by one line per interval; the first word is duplicated at the end so the loop-back reads as continuous, then snaps invisibly back to the real first word once the transition finishes.",
		],
	},
	a11y: {
		notes: [
			"The cycling word stack updates live in the DOM; treat as decorative copy, not content a screen reader user needs to catch mid-cycle.",
		],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) Animata",
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
