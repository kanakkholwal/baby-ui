import { defineComponent } from "../index";

export const toggleGroup = defineComponent({
	slug: "toggle-group",
	name: "Toggle Group",
	description: "Row of toggles in single or multiple mode, sharing one tab stop.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "value",
			type: "string | string[]",
			description: "Selected value, or values when multiple. Bindable.",
			control: { kind: "none" },
		},
		{
			name: "type",
			type: '"single" | "multiple"',
			description: "Whether more than one item can be pressed at once.",
			default: "single",
			control: { kind: "select", options: ["single", "multiple"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Item size.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the whole group.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		keyboard: ["Tab moves into the group, then between options"],
		notes: [
			"role=group with a label, and each option carries aria-pressed.",
			"In single mode clicking the active option clears it. If clearing makes no sense for your data, this should be a radio group instead.",
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
			entry: "ToggleGroup",
			files: [
				{ path: "toggle-group/toggle-group.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ToggleGroup",
			files: [
				{ path: "toggle-group/toggle-group.svelte", type: "registry:ui" },
				{ path: "toggle-group/toggle-group-item.svelte", type: "registry:ui" },
				{ path: "toggle-group/context.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["toggle", "group"],
});
