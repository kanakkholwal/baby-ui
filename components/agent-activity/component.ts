import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { agentActivity as agentActivityVariants } from "./variants";

const VARIANTS = ["plain", "card"];

export const agentActivity = defineComponent({
	slug: "agent-activity",
	name: "Agent Activity",
	description:
		"An agent's run as a live log of steps, searches and tool calls that glides as it grows, then folds into a one-line summary.",
	category: "agents",
	status: "beta",
	added: "2026-10-31",
	variants: variantsOf(agentActivityVariants, ["variant"]),
	props: [
		{
			name: "status",
			type: '"working" | "complete"',
			description:
				"AgentActivity: `working` keeps the log open and gliding; `complete` folds it behind the summary.",
			default: "working",
			control: { kind: "select", options: ["working", "complete"] },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"AgentActivity: `plain` sits inline in a chat turn; `card` frames the run.",
			default: "plain",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "open / defaultOpen / onOpenChange",
			type: "boolean / boolean / (open: boolean) => void",
			description:
				"AgentActivity: whether the finished log is open. A working run is always open; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "collapseOnComplete",
			type: "boolean",
			description: "AgentActivity: fold the log away the moment the run completes.",
			default: true,
			control: { kind: "none" },
		},
		{
			name: "maxHeight",
			type: "number",
			description:
				"AgentActivity: in px. Past it the live log glides up and the finished one scrolls.",
			default: 208,
			control: { kind: "none" },
		},
		{
			name: "label / summary",
			type: "string",
			description:
				'AgentActivityTrigger: the shimmering line while working, and what the run did once it ends, e.g. "Worked for 12s".',
			required: true,
			control: { kind: "none" },
		},
		{
			name: "status / meta",
			type: '"pending" | "active" | "done" / string',
			description: "AgentActivityStep: the step's state and a trailing detail.",
			control: { kind: "none" },
		},
		{
			name: "query / more",
			type: "string / number",
			description:
				"AgentActivitySearch: the query, and how many results were found but not listed. AgentActivityResult rows go inside.",
			control: { kind: "none" },
		},
		{
			name: "href / domain / icon",
			type: "string / string / ReactNode | Snippet",
			description: "AgentActivityResult: the source link, its domain and a favicon.",
			control: { kind: "none" },
		},
		{
			name: "action / target / additions / deletions",
			type: '"read" | "edit" | "run" | string / string / number / number',
			description:
				"AgentActivityTool: the verb, what it acted on, and lines added and removed.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"AgentActivity: AgentActivityTrigger, then AgentActivityContent holding AgentActivityStep, AgentActivityText, AgentActivitySearch and AgentActivityTool rows.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Rows appear without rising, the list jumps instead of gliding, and the fold is instant.",
		behaviour: [
			"Each new row rises in; past the max height the list glides up so the newest row stays in view.",
			"On completion the log folds on grid rows behind the summary; the chevron turns as it opens.",
			"The working label shimmers; an active step's dot pulses.",
		],
	},
	a11y: {
		keyboard: [{ keys: ["Enter", "Space"], action: "Open or close the finished log" }],
		notes: [
			"While working, the label is a status region and the root is busy; the summary is then a disclosure button.",
			"The rows are a list; search results are links that open in a new tab.",
		],
	},
	guidance: {
		when: ["A chat turn where an agent searches, reads and edits before it answers."],
		whenNot: [
			{ text: "Chain-of-thought text with steps and sources.", use: "reasoning" },
			{ text: "A planned list of steps with retry.", use: "task-steps" },
			{ text: "One tool call with its input and output.", use: "tool" },
		],
		responsive: [
			"Rows truncate their targets and domains; the summary truncates on one line.",
		],
		performance: ["One ResizeObserver per log; motion is CSS transitions only."],
		ai: [
			"Append rows as events stream and set `status` to complete when the run ends.",
			"Write the summary from what happened: duration, sources searched, files changed.",
		],
	},
	licenseOrigin: {
		source: "beui",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},
	// Files, npm and registry dependencies are derived from each port's imports by pnpm gen.
	impl: {
		react: { entry: "AgentActivity" },
		svelte: { entry: "AgentActivity" },
	},
	keywords: ["agent", "activity", "log", "run", "search", "tool", "steps", "trace"],
});
