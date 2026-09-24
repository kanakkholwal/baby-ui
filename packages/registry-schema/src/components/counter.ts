import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];
const DIRECTIONS = ["up", "down"];

export const counter = defineComponent({
	slug: "counter",
	name: "Counter",
	description: "Counts up (or down) to a target number.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "value",
			type: "number",
			description: "The number to count toward. Re-animates whenever this changes.",
			control: { kind: "number", min: 0, max: 100000, step: 1 },
		},
		{
			name: "format",
			type: "(value: number) => string",
			description: "Formats the displayed number. Defaults to locale-grouped integers.",
			control: { kind: "none" },
		},
		{
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description:
				"Which way the count runs on its first play: from 0, or down from `value`.",
			default: "up",
			control: { kind: "select", options: DIRECTIONS },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the count takes.",
			default: 1200,
			control: { kind: "number", min: 300, max: 4000, step: 100 },
		},
		{
			name: "delayMs",
			type: "number",
			description: "Delay before the count starts.",
			default: 0,
			control: { kind: "number", min: 0, max: 2000, step: 100 },
		},
		{
			name: "triggerOnView",
			type: "boolean",
			description: "Wait until the counter scrolls into view before the first count.",
			default: true,
			control: { kind: "boolean" },
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
		reducedMotion:
			"Jumps straight to the formatted target instead of counting through it.",
		behaviour: [
			"Counts from 0 (or from `value` for `direction=\"down\"`) to `value` with an eased ramp, written directly to the element's text so counting doesn't cost a re-render per frame.",
			"Changing `value` re-counts from wherever the display currently sits.",
		],
	},

	impl: {
		react: {
			entry: "Counter",
			files: [
				{ path: "counter/counter.tsx", type: "registry:ui" },
				{ path: "counter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Counter",
			files: [
				{ path: "counter/counter.svelte", type: "registry:ui" },
				{ path: "counter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "counter", "number", "count-up"],
});
