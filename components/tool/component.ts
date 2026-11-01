import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { tool as toolVariants } from "./variants";

const STATUSES = ["pending", "running", "done", "error"];
const VARIANTS = ["card", "plain"];
const KINDS = ["function", "terminal", "request", "search"];

export const tool = defineComponent({
	slug: "tool",
	name: "Tool Call",
	description:
		"One tool call as a row that opens onto its input and a live output log, with copy and run again.",
	category: "agents",
	status: "stable",
	variants: variantsOf(toolVariants, ["variant"]),
	props: [
		{
			name: "status",
			type: STATUSES.map((s) => `"${s}"`).join(" | "),
			description:
				"Tool: where the call is. Starting to run opens the panel; the trigger, output and retry follow it.",
			default: "running",
			control: { kind: "select", options: STATUSES },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "Tool: `card` is a bordered row; `plain` sits inline in a chat turn.",
			default: "card",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "open / defaultOpen / onOpenChange",
			type: "boolean / boolean / (open: boolean) => void",
			description: "Tool: whether the panel shows. Bindable `open` in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "collapseOnComplete",
			type: "boolean",
			description:
				"Tool: fold the panel once the call finishes, leaving the one-line row.",
			default: false,
			control: { kind: "none" },
		},
		{
			name: "name / title / kind",
			type: `string / string / ${KINDS.map((k) => `"${k}"`).join(" | ")}`,
			description:
				"ToolTrigger: the tool's name as the model calls it, what it is doing in words, and the icon.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<Record<status, string>>",
			description: "ToolTrigger: replaces the status words, e.g. for another language.",
			control: { kind: "none" },
		},
		{
			name: "label / maxHeight",
			type: "string / number",
			description:
				"ToolInput and ToolOutput: the section label, and the output's height in px before it scrolls.",
			control: { kind: "none" },
		},
		{
			name: "text / onClick",
			type: "string / () => void",
			description:
				"ToolCopy copies `text`; ToolRetry runs the call again and shows once it has finished or failed.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"Tool: ToolTrigger, then ToolContent holding ToolInput, ToolOutput and ToolActions (ToolCopy, ToolRetry).",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The spinner stops, the status word swaps in place, and the panel opens instantly.",
		behaviour: [
			"Only the running state animates. Everything else is a static icon, so a finished list is still.",
			"The panel folds on grid rows; the chevron turns with it. The status word rises in when it changes.",
			"While running, the output keeps its newest line in view.",
		],
	},
	a11y: {
		keyboard: [{ keys: ["Enter", "Space"], action: "Toggles the panel" }],
		notes: [
			"State is written out as a word beside the icon, so it does not depend on colour.",
			"The output is a polite log, so streamed lines are read as they arrive.",
			"Copy and run again are named buttons.",
		],
	},
	guidance: {
		when: ["Showing a model's tool call with what it sent and what came back."],
		whenNot: [
			{ text: "A whole run of searches, reads and edits.", use: "agent-activity" },
			{ text: "A compact list of calls as chips.", use: "tool-chips" },
		],
		responsive: [
			"The name and title truncate; long output wraps and scrolls past `maxHeight`.",
		],
		performance: ["One MutationObserver per output, active only while running."],
		ai: [
			"Set `title` to what the call does in words and keep `name` as the real tool name.",
			"Stream output into ToolOutput while `status` is running; set done or error when it ends.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: { entry: "Tool" },
		svelte: { entry: "Tool" },
	},
	keywords: ["tool", "function call", "terminal", "output", "agent"],
});
