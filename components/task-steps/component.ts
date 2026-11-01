import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { taskSteps as taskStepsVariants } from "./variants";

export const taskSteps = defineComponent({
	slug: "task-steps",
	name: "Task Steps",
	description:
		"An agent plan of steps that are pending, active, done or failed, as a timeline or rows that open onto their details, with progress and retry.",
	category: "agents",
	status: "stable",
	variants: variantsOf(taskStepsVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: '"timeline" | "capsules" | "list"',
			description:
				"`timeline` ticks down a connector; `capsules` and `list` are expandable rows with a figure, a status pill and details.",
			default: "timeline",
			control: { kind: "select", options: ["timeline", "capsules", "list"] },
		},
		{
			name: "showConnector",
			type: "boolean",
			description: "Draw a rule connecting consecutive steps.",
			default: true,
			control: { kind: "boolean" },
			showWhen: { variant: ["timeline"] },
		},
		{
			name: "compact",
			type: "boolean",
			description: "Tighter rows for a sidebar.",
			default: false,
			control: { kind: "boolean" },
			showWhen: { variant: ["timeline"] },
		},
		{
			name: "size",
			type: '"sm" | "default"',
			description: "Marker, icon and label scale.",
			default: "default",
			control: { kind: "select", options: ["sm", "default"] },
			showWhen: { variant: ["timeline"] },
		},
		{
			name: "labels",
			type: "Partial<Record<TaskStatus, string>>",
			description:
				"Overrides for the screen-reader status words (Pending, In progress, Done, Failed).",
			control: { kind: "none" },
		},
		{
			name: "label / status / meta / step",
			type: 'string / "pending" | "active" | "done" | "failed" / string / number',
			description:
				"TaskStep: what the step is, where it is, a right-aligned figure, and the number in a row's ring.",
			control: { kind: "none" },
		},
		{
			name: "progress",
			type: "number",
			description: "TaskStep: how far an active step is, from 0 to 1, as a thin bar.",
			control: { kind: "none" },
		},
		{
			name: "onRetry",
			type: "() => void",
			description: "TaskStep: shows a retry button once the step has failed.",
			control: { kind: "none" },
		},
		{
			name: "open / defaultOpen / onOpenChange",
			type: "boolean / boolean / (open: boolean) => void",
			description:
				"TaskStep: whether a row's details are open. Bindable `open` in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "title / done / total",
			type: "string / number / number",
			description: 'TaskStepsHeader: a title with "2 of 4" and a bar.',
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"TaskSteps: TaskStep items. TaskStep: TaskStepDetails with TaskStepDetail rows, inline on a timeline or in the fold of a row.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Status icons swap without the spin or the draw.",
		behaviour: [
			"The active step's spinner rotates at 850ms linear; every other icon is static.",
			"A step turning done draws its tick over 200ms, the same draw the checkbox uses.",
			"The connector above a completed step fills from top to bottom over 300ms.",
			"Rows fade up; a row opens its details on grid rows and the chevron turns.",
			"An active step's bar and the header's bar grow as progress changes.",
		],
	},
	a11y: {
		role: "list",
		keyboard: [{ keys: ["Enter", "Space"], action: "Open or close a row's details" }],
		notes: [
			"Each step carries its status as text for assistive tech, not only as an icon colour.",
			"The list is aria-live=polite so a status change is announced once, without re-reading the whole plan.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: {
			entry: "TaskSteps",
		},
		svelte: {
			entry: "TaskSteps",
		},
	},
	keywords: ["tasks", "steps", "agent", "plan", "progress"],
});
