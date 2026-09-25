import { defineComponent } from "../index";

export const taskSteps = defineComponent({
	slug: "task-steps",
	name: "Task Steps",
	description:
		"Ordered agent plan where each step shows pending, active, done or failed.",
	category: "agents",
	status: "stable",
	props: [
		{
			name: "steps",
			type: "{ id: string; label: string; status: TaskStatus }[]",
			description: "Steps in execution order.",
			control: { kind: "none" },
		},
		{
			name: "showConnector",
			type: "boolean",
			description: "Draw a rule connecting consecutive steps.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "compact",
			type: "boolean",
			description: "Tighter rows for a sidebar.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "size",
			type: '"sm" | "md"',
			description: "Marker, icon and label scale.",
			default: "md",
			control: { kind: "select", options: ["sm", "md"] },
		},
		{
			name: "labels",
			type: "Partial<Record<TaskStatus, string>>",
			description:
				"Overrides for the screen-reader status words (Pending, In progress, Done, Failed).",
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
		],
	},
	a11y: {
		role: "list",
		keyboard: [],
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
			files: [
				{ path: "task-steps/task-steps.tsx", type: "registry:ui" },
				{ path: "task-steps/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TaskSteps",
			files: [
				{ path: "task-steps/task-steps.svelte", type: "registry:ui" },
				{ path: "task-steps/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["tasks", "steps", "agent", "plan", "progress"],
});
