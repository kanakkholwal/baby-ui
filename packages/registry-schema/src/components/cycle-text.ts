import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const cycleText = defineComponent({
	slug: "cycle-text",
	name: "Cycle Text",
	description: "Cycles through a list of words on an interval.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "words",
			type: "string[]",
			description: "The words to cycle through.",
			control: { kind: "none" },
		},
		{
			name: "index",
			type: "number",
			description: "Controlled: which word is showing. Omit to let the component own it.",
			control: { kind: "none" },
		},
		{
			name: "defaultIndex",
			type: "number",
			description: "Uncontrolled starting index.",
			default: 0,
			control: { kind: "number", min: 0, max: 10, step: 1 },
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
			description: "Auto-advance period. Only runs while uncontrolled.",
			default: 1300,
			control: { kind: "number", min: 300, max: 4000, step: 100 },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long each word's enter animation takes.",
			default: 260,
			control: { kind: "number", min: 100, max: 800, step: 20 },
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
		reducedMotion: "Words crossfade in place; the width snaps.",
		behaviour: [
			"The incoming word fades and drifts up 10px into place; the outgoing word keeps drifting up as it fades, over --duration-exit.",
			"The width eases to the new word over --duration-overlay, so the sentence around it never jumps.",
		],
	},

	impl: {
		react: {
			entry: "CycleText",
			files: [
				{ path: "cycle-text/cycle-text.tsx", type: "registry:ui" },
				{ path: "cycle-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "CycleText",
			files: [
				{ path: "cycle-text/cycle-text.svelte", type: "registry:ui" },
				{ path: "cycle-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "cycle", "rotate", "loop", "interval"],
});
