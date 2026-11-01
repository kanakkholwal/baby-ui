import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { todoList as todoListVariants } from "./variants";

const VARIANTS = ["outline", "muted", "plain"];

export const todoList = defineComponent({
	slug: "todo-list",
	name: "Todo List",
	description:
		"An agent's to-do list: rings that fill as each task runs, a strike that draws when it completes, and a count that folds the list away once all are done.",
	category: "agents",
	status: "beta",
	added: "2026-11-01",
	variants: variantsOf(todoListVariants, ["variant"]),
	props: [
		{
			name: "items",
			type: "TodoItem[]",
			description:
				'TodoList: tasks in order, each `{ id, title, status, progress?, detail? }`. Status is `"pending" | "in-progress" | "completed" | "cancelled"`.',
			required: true,
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"TodoList: `outline` a hairline frame, `muted` a filled one, `plain` none.",
			default: "outline",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "collapseOnComplete",
			type: "boolean",
			description:
				"TodoList: fold once every task is completed, and open again if one reopens.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "open / defaultOpen / onOpenChange",
			type: "boolean / boolean / (open: boolean) => void",
			description: "TodoList: whether the list shows; bindable `open` in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "title",
			type: "string",
			description: 'TodoListTrigger: the heading beside the "2/5" count.',
			default: '"To-dos"',
			control: { kind: "none" },
		},
		{
			name: "maxHeight / emptyText",
			type: "number / string",
			description:
				"TodoListContent: px before the list scrolls, and the line shown with no tasks.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description: "TodoList: TodoListTrigger, then TodoListContent.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Rings, ticks and strikes appear without drawing; the indeterminate ring holds still and the list folds instantly.",
		behaviour: [
			"An in-progress ring fills to its `progress`, or a short arc turns when there is none.",
			"Completing draws a tick in the ring and a line through the title; cancelling draws a cross.",
			"The count rolls as tasks complete; at the last one the header icon becomes a green tick and the list folds.",
			"New tasks rise in and scroll into view.",
		],
	},
	a11y: {
		keyboard: [{ keys: ["Enter", "Space"], action: "Open or close the list" }],
		notes: [
			'Each task reads its status before its title, e.g. "Completed: Add tests".',
			'The count reads as "2 of 5 tasks completed"; the list is a polite live region.',
		],
	},
	guidance: {
		when: ["An agent's plan it works through, with progress on the current task."],
		whenNot: [
			{ text: "A plan with per-step details and retry.", use: "task-steps" },
			{ text: "A live log of searches and tool calls.", use: "agent-activity" },
		],
		responsive: ["Titles truncate on one line; details stay on the right."],
		performance: ["Motion is CSS transitions on SVG strokes; nothing runs while idle."],
		ai: [
			"Send the whole list each update with new statuses; leave `progress` out when it is unknown.",
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
		react: { entry: "TodoList" },
		svelte: { entry: "TodoList" },
	},
	keywords: ["todo", "tasks", "checklist", "agent", "plan", "progress"],
});
