import { defineComponent } from "../index";

const VARIANTS = ["capsules", "list"];

export const taskRows = defineComponent({
	slug: "task-rows",
	name: "Task Rows",
	description:
		"Expandable status rows, each with a badge, an amount, and a detail list that drops down.",
	category: "agents",
	status: "stable",
	variants: { variant: VARIANTS },
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"`capsules` are separate rounded cards; `list` is one flat bordered stack.",
			default: "capsules",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "rows",
			type: "TaskRow[]",
			description:
				"The tasks to show. Fully controlled: each row's `status` (`pending` | `running` | `done` | `failed`) comes straight from this prop, with no internal timer simulating progress.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<TaskRowsLabels>",
			description: "Override the `completed`/`failed` pill copy.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Row entrance and the badge pop-in drop; status changes still render instantly.",
		behaviour: [
			"Rows fade up on mount, staggered 80ms apart.",
			"A row's badge and pill re-render immediately when its `status` prop changes; any pending → failed → done narrative is the caller's own state, not a timer inside this component.",
			"A row's own corner radius eases between 22px (closed) and 14px (open) as its detail list expands.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Each row is a real disclosure button (`aria-expanded`), reachable and toggleable by keyboard.",
			"Status is never colour-only: the completed/failed pill repeats it as text via `Badge`.",
			"The retry glyph only renders as a real button, wired to `onRetry`, when that callback is passed; it never appears as inert decoration.",
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
			entry: "TaskRows",
			files: [
				{ path: "task-rows/task-rows.tsx", type: "registry:ui" },
				{ path: "task-rows/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["badge"],
		},
		svelte: {
			entry: "TaskRows",
			files: [
				{ path: "task-rows/task-rows.svelte", type: "registry:ui" },
				{ path: "task-rows/types.ts", type: "registry:ui" },
				{ path: "task-rows/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["badge"],
		},
	},
	keywords: ["tasks", "status", "rows", "agent", "retry"],
});
