import { defineComponent } from "../index";

const DENSITIES = ["comfortable", "compact"];

export const recordsTable = defineComponent({
	slug: "records-table",
	name: "Records Table",
	description:
		"An AI-spreadsheet grid: columns are configurable properties, each with a type, a tool and a prompt.",
	category: "advanced",
	status: "alpha",
	variants: { density: DENSITIES },
	props: [
		{
			name: "rows",
			type: "RecordRow[]",
			description:
				"Every company row shown. Required: this table has no sample data of its own.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "Partial<RecordsTableLabels>",
			description: "Column header text overrides.",
			control: { kind: "none" },
		},
		{
			name: "fill",
			type: "boolean",
			description:
				"Stretches to fill its container instead of sizing to its own columns.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "density",
			type: DENSITIES.map((v) => `"${v}"`).join(" | "),
			description: "Row height and default column widths.",
			default: "comfortable",
			control: { kind: "select", options: DENSITIES },
		},
		{
			name: "modelOptions",
			type: "string[]",
			description:
				"Real model names offered by the Tool picker; empty offers nothing, not a fictional default list.",
			control: { kind: "none" },
		},
		{
			name: "calculatingColumn",
			type: "string | null",
			description:
				"Column currently revealing computed values row by row. Omit/`null` shows none; the caller owns the reveal timing.",
			control: { kind: "none" },
		},
		{
			name: "resolvedCount",
			type: "number",
			description: "Row count already resolved for `calculatingColumn`.",
			default: 0,
			control: { kind: "none" },
		},
		{
			name: "onCalculate",
			type: "(column: string) => void",
			description: 'Fired when "Go calculate" is pressed for a column.',
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"No motion beyond the shared `animate-pulse` calculating dot and `card-fade-up` for the advanced-settings reveal; both already respect reduced motion via the shared token.",
		behaviour: [
			"Column headers open a config popover (type, tool, inputs, prompt preview) built from the real Select/Popover/Switch/HoverCard primitives, not a hand-rolled menu.",
			'Row calculation reveal (row-by-row "Calculating…") is entirely driven by `calculatingColumn`/`resolvedCount`; the component never times its own reveal.',
		],
	},
	a11y: {
		keyboard: [
			"Tab reaches each header's sort/config controls, the resize handle, and every row checkbox",
		],
		notes: [
			'Column resize handles are `role="separator"` with an `aria-label` naming the column.',
			"Sort buttons carry an `aria-label` naming the column being sorted.",
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
			entry: "RecordsTable",
			files: [
				{ path: "records-table/records-table.tsx", type: "registry:ui" },
				{ path: "records-table/config-popover.tsx", type: "registry:ui" },
				{ path: "records-table/tag-list.tsx", type: "registry:ui" },
				{ path: "records-table/types.ts", type: "registry:ui" },
				{ path: "records-table/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: [
				"checkbox",
				"dropdown-menu",
				"popover",
				"select",
				"switch",
				"hover-card",
				"button",
			],
		},
		svelte: {
			entry: "RecordsTable",
			files: [
				{ path: "records-table/records-table.svelte", type: "registry:ui" },
				{ path: "records-table/config-popover.svelte", type: "registry:ui" },
				{ path: "records-table/picker-select.svelte", type: "registry:ui" },
				{ path: "records-table/tag-list.svelte", type: "registry:ui" },
				{ path: "records-table/types.ts", type: "registry:ui" },
				{ path: "records-table/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: [
				"checkbox",
				"dropdown-menu",
				"popover",
				"select",
				"switch",
				"hover-card",
				"button",
			],
		},
	},
	keywords: ["table", "records", "spreadsheet", "ai", "columns"],
});
