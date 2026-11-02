import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { planRunner as planRunnerVariants } from "./variants";

const VARIANTS = ["framed", "plain"];
const STATUSES = ["pending", "running", "done", "failed"];
const TOOLS = ["search", "read", "edit", "test", "ship"];

export const planRunner = defineComponent({
	slug: "plan-runner",
	name: "Plan Runner",
	description:
		"An agent's plan, run step by step: segmented progress, a timeline with tool badges, timers and streaming output, an input to steer the next step, and Stop.",
	category: "agents",
	status: "beta",
	added: "2026-11-01",
	variants: variantsOf(planRunnerVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"PlanRunner: `framed` holds the plan in a card rim under its header; `plain` drops the chrome.",
			default: "framed",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "segments",
			type: "{ id: string; label: string; status: PlanStepStatus }[]",
			description:
				"PlanRunnerProgress: one segment per step; hover or focus one for its label and status.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "status",
			type: STATUSES.map((s) => `"${s}"`).join(" | "),
			description:
				"PlanRunnerStep: drives the marker, the connector and the title's weight.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "kind",
			type: TOOLS.map((t) => `"${t}"`).join(" | "),
			description: "PlanRunnerTool: the step's tool badge; children replace its word.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "seconds",
			type: "number",
			description:
				"PlanRunnerTimer: time on the step, from your clock; reads 42s or 1:24.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "open",
			type: "boolean",
			description:
				"PlanRunnerOutput: folds the log away when false; it follows its end while the step runs.",
			default: "true",
			control: { kind: "none" },
		},
		{
			name: "onClick / loading",
			type: "() => void / boolean",
			description: "PlanRunnerStop: stops the run; `loading` while the agent winds down.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"PlanRunner: Header (Title, Meta), Body (Progress, Steps of Step > StepHead + Output, Steer with a Composer), then Footer (Summary, Stop).",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Markers stop spinning, the running segment stops pulsing, and output folds instantly.",
		behaviour: [
			"Segments fill in the step's colour; pointing at one fades the rest.",
			"A step's output unfolds while it runs and folds once it is done.",
			"New steps rise in, e.g. after a steer.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab"], action: "Moves through the segments, the steer input and Stop" },
		],
		notes: [
			'The bar is a native progress element: "3 of 5 steps done".',
			"Each step leads with its status word for screen readers.",
			"The summary is a polite live region.",
		],
	},
	guidance: {
		when: ["An agent works through a plan a person can watch, redirect or stop."],
		whenNot: [
			{ text: "A static checklist.", use: "task-steps" },
			{ text: "Several agents at once.", use: "agent-list" },
		],
		responsive: ["Step titles truncate; the badge and timer keep their width."],
		performance: ["Output blocks cap at 8 lines and scroll inside."],
		ai: [
			"Map plan steps to segments and steps 1:1, in order.",
			"Insert a steer as the next pending step rather than editing the running one.",
		],
	},
	impl: {
		react: { entry: "PlanRunner" },
		svelte: { entry: "PlanRunner" },
	},
	keywords: ["plan", "agent", "steps", "runner", "progress", "steer", "stop"],
});
