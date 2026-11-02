import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { contextMeter as contextMeterVariants } from "./variants";

const VARIANTS = ["framed", "plain"];

export const contextMeter = defineComponent({
	slug: "context-meter",
	name: "Context Meter",
	description:
		"How full a model's context window is, as a segmented meter of system prompt, tools, files, conversation and tool results, with pinned rows, clear actions and compaction.",
	category: "agents",
	status: "beta",
	added: "2026-11-01",
	variants: variantsOf(contextMeterVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"ContextMeter: `framed` holds it in a card rim under its header; `plain` drops the chrome.",
			default: "framed",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "segments",
			type: "ContextSegment[]",
			description:
				"ContextMeter: `{ id, label, value, detail?, pinned?, action?, color? }` per source; `color` is 1 to 5 for a chart colour or any CSS colour.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "limit",
			type: "number",
			description: "ContextMeter: the model's window in tokens.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "warnAt / compactAt",
			type: "number",
			description:
				"ContextMeter: from 0 to 1. Past `warnAt` the percentage turns amber; `compactAt` is marked on the bar and turns it red.",
			default: "0.7 / 0.85",
			control: { kind: "none" },
		},
		{
			name: "onAction",
			type: "(id: string) => void",
			description: "ContextMeter: a row's `action` (Clear, Unpin) was pressed.",
			control: { kind: "none" },
		},
		{
			name: "note",
			type: "string",
			description: 'ContextMeterFooter: a line such as "Auto-compacts at 85%".',
			control: { kind: "none" },
		},
		{
			name: "onClick / loading",
			type: "() => void / boolean",
			description:
				"ContextMeterCompact: summarizes the conversation; `loading` while it runs.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"ContextMeter: ContextMeterHeader (Icon, Title, Subtitle, Percent), then ContextMeterBody holding ContextMeterSummary, ContextMeterBar, ContextMeterList and ContextMeterFooter (ContextMeterCompact).",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Segments resize and the percentage changes without easing.",
		behaviour: [
			"Each segment eases to its new width as the window fills or frees up.",
			"The percentage rolls to its new value and turns amber past `warnAt`, red past `compactAt`.",
		],
	},
	a11y: {
		notes: [
			'The bar is a meter with "139k of 200k" as its value text; the rows list every source in words.',
			'Row actions are named with their source, e.g. "Clear Tool results".',
			"Segments are 24px tall but as wide as their share; each row (44px) is the equivalent target.",
		],
	},
	guidance: {
		when: ["Showing what fills an agent's context window and letting people free space."],
		whenNot: [
			{ text: "Billing or plan usage.", use: "usage-card" },
			{ text: "A single progress value.", use: "progress" },
		],
		responsive: [
			"Notes truncate first, then labels; sizes and actions keep their width.",
		],
		performance: ["Pure render of the segments; widths animate with CSS."],
		ai: [
			"Recompute segments from the token counts you send to the model each turn.",
			"Pin the system prompt and tool definitions: they survive compaction.",
		],
	},
	impl: {
		react: { entry: "ContextMeter" },
		svelte: { entry: "ContextMeter" },
	},
	keywords: ["context", "tokens", "window", "meter", "compaction", "agent", "usage"],
});
