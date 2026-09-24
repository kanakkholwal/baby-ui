import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];
const MODES = ["word", "character"];

export const jumpingText = defineComponent({
	slug: "jumping-text",
	name: "Jumping Text",
	description: "A bouncy per-word or per-character entrance, Instagram-story style.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to reveal.",
			control: { kind: "text" },
			default: "This is a jumping text effect",
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description: "Stagger per whole word, or per character.",
			default: "word",
			control: { kind: "select", options: MODES },
		},
		{
			name: "stepMs",
			type: "number",
			description:
				"Delay step between units. Defaults to 50 for words, 10 for characters.",
			default: 50,
			control: { kind: "number", min: 0, max: 150, step: 5 },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long each unit's jump-in takes.",
			default: 500,
			control: { kind: "number", min: 150, max: 1200, step: 50 },
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
		reducedMotion: "Units still fade in, without the drop, rotate or overshoot.",
		behaviour: [
			"Each unit drops in with a slight rotation and a spring overshoot, staggered by index.",
		],
	},
	a11y: {
		notes: [
			"A single `sr-only` copy carries the real text; the animated units are visual only.",
		],
	},

	impl: {
		react: {
			entry: "JumpingText",
			files: [
				{ path: "jumping-text/jumping-text.tsx", type: "registry:ui" },
				{ path: "jumping-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "JumpingText",
			files: [
				{ path: "jumping-text/jumping-text.svelte", type: "registry:ui" },
				{ path: "jumping-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "jump", "bounce", "spring", "animated"],
});
