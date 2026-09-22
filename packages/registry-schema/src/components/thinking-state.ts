import { defineComponent } from "../index";

const VARIANTS = ["steps", "reasoning", "search", "coding"];

export const thinkingState = defineComponent({
	slug: "thinking-state",
	name: "Thinking State",
	description:
		"Collapsible agent trace: works, settles, stays expandable. Four row shapes for four trace kinds.",
	category: "agents",
	status: "stable",
	variants: { variant: VARIANTS },
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Row shape: `steps` (checkmark/spinner), `reasoning` (plain prose), `search` (linked results with a query line), `coding` (selectable tool calls with a diff count).",
			default: "steps",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "rows",
			type: "ThinkingRow[]",
			description:
				'The trace\'s steps, rendered as-is with no internal reveal timer. Each has a primary line, an optional secondary/mono value, an optional add/del diff count, an `href` for search-result rows, or `status: "active"` (the `steps` variant only) to show a spinner instead of a checkmark.',
			control: { kind: "none" },
		},
		{
			name: "thinking",
			type: "boolean",
			description:
				"Whether the trace is still in progress, same contract as Reasoning's own `thinking` prop. Drives the shimmered header and auto-expand; the component has no internal timer of its own.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "activeLabel",
			type: "string",
			description: "Header text while `thinking` is true (shimmered).",
			control: { kind: "text" },
		},
		{
			name: "doneLabel",
			type: "string",
			description: "Header text once `thinking` is false.",
			control: { kind: "text" },
		},
		{
			name: "query",
			type: "string",
			description:
				"Optional search-query line shown above the rows (the `search` variant).",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The shimmer and row entrance animations drop; state changes remain instant either way.",
		behaviour: [
			"Auto-expands while `thinking` is true, auto-collapses once it's false, unless the reader has already toggled it manually — identical to Reasoning's own open logic.",
			"Rows render immediately and fade up staggered by 80ms each on mount; the connecting rail's height animates to match the expanded content.",
			"The header label shimmers (the shared `.reasoning-shimmer` class) while `thinking`, then fades to a plain settled label.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"The header is a real disclosure button (`aria-expanded`/`aria-controls`); the trace stays reachable after it settles, not just during the reveal.",
			"`search` rows are real links; `coding` rows are real toggle buttons (`aria-pressed`), not divs with a click handler.",
		],
	},
	licenseOrigin: {
		source: "beUI",
		url: "https://beui.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 beUI",
	},
	impl: {
		react: {
			entry: "ThinkingState",
			files: [
				{ path: "thinking-state/thinking-state.tsx", type: "registry:ui" },
				{ path: "thinking-state/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "ThinkingState",
			files: [
				{ path: "thinking-state/thinking-state.svelte", type: "registry:ui" },
				{ path: "thinking-state/types.ts", type: "registry:ui" },
				{ path: "thinking-state/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["thinking", "trace", "reasoning", "agent", "search", "tool-calls"],
});
