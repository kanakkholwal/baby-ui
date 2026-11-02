import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { agentList as agentListVariants } from "./variants";

const VARIANTS = ["framed", "plain"];
const STATUSES = ["queued", "running", "needs-input", "done", "failed"];

export const agentList = defineComponent({
	slug: "agent-list",
	name: "Agent List",
	description:
		"Background agents as rows with a status marker, branch and diff counts; a row opens to its steps and any decision it is waiting on, with a composer to queue the next task.",
	category: "agents",
	status: "beta",
	added: "2026-11-01",
	variants: variantsOf(agentListVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"AgentList: `framed` holds the rows in a card rim under the header; `plain` drops the chrome.",
			default: "framed",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "value / onValueChange",
			type: "string | null / (value: string | null) => void",
			description: "AgentList: the open agent. Controlled.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "status",
			type: STATUSES.map((s) => `"${s}"`).join(" | "),
			description:
				'AgentListItem: drives the marker; "needs-input" also tints the row. Step markers take "pending" | "running" | "done".',
			required: true,
			control: { kind: "none" },
		},
		{
			name: "added / removed",
			type: "number",
			description: "AgentListDiff: lines the agent added and removed.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "prompt / open",
			type: "ReactNode | string / boolean",
			description:
				"AgentListDecision: what the agent asks; set `open` false after an answer and it folds away.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "number",
			description:
				'AgentListCount: how many run, e.g. "2 running"; it rolls as it changes.',
			required: true,
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"AgentList: AgentListHeader (Title, Count), AgentListRows of AgentListItem (Trigger with Status, Heading > Name + Meta, Diff; Content with Steps and Decision > Actions), then AgentListFooter.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Rows open and decisions fold without easing; the running marker stops turning.",
		behaviour: [
			"Rows unfold on grid rows; opening one folds the last.",
			"An answered decision folds away, and new steps rise in.",
			"The running marker turns; the count rolls.",
		],
	},
	a11y: {
		keyboard: [
			{
				keys: ["Tab"],
				action: "Moves through the rows, the open decision and the composer",
			},
			{ keys: ["Enter", "Space"], action: "Opens or closes a row" },
		],
		notes: [
			"Status is a marker plus a screen-reader word, never colour alone.",
			'Diff counts read as "added 18, removed 4".',
			"Closed panels and answered decisions are inert.",
		],
	},
	guidance: {
		when: ["Several agents run in the background and some may need a person."],
		whenNot: [
			{ text: "One agent's live log.", use: "agent-activity" },
			{ text: "Sign-offs for tool calls.", use: "approval-queue" },
		],
		responsive: [
			"Names and meta truncate; the marker, diff and chevron keep their width.",
		],
		performance: ["One row per agent; steps render only their labels."],
		ai: [
			"Map your agent states onto the five statuses; open the first needs-input row.",
			"Close the decision once the answer is sent, then move the agent to running.",
		],
	},
	impl: {
		react: { entry: "AgentList" },
		svelte: { entry: "AgentList" },
	},
	keywords: ["agents", "background", "tasks", "runs", "queue", "diff", "needs input"],
});
