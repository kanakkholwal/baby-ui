import { defineComponent } from "../index";

export const radioGroup = defineComponent({
	slug: "radio-group",
	name: "Radio Group",
	description: "Single-choice group with roving focus and an indicator that scales in.",
	category: "base",
	status: "stable",
	variants: { orientation: ["vertical", "horizontal"] },
	props: [
		{
			name: "value",
			type: "string",
			description: "Selected option value. Bindable.",
			control: { kind: "text" },
		},
		{
			name: "orientation",
			type: '"vertical" | "horizontal"',
			description: "Layout direction.",
			default: "vertical",
			control: { kind: "select", options: ["vertical", "horizontal"] },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the whole group.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "options",
			type: "{ value: string; label: string }[]",
			description: "Options, in order.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The indicator appears at full size.",
		behaviour: [
			"The selected dot scales from 0.6 to 1 over 140ms, the same duration as a button press.",
			"It never scales from 0: nothing in the world appears from nothing.",
		],
	},
	a11y: {
		role: "radiogroup",
		keyboard: [
			"Arrow keys move between options and select as they go",
			"Tab enters the group at the selected option, not the first",
		],
		notes: [
			"Roving tabindex, so the group is one tab stop. Arrow keys selecting on move is the documented radio pattern, not an accident.",
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
			entry: "RadioGroup",
			files: [
				{ path: "radio-group/radio-group.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "RadioGroup",
			files: [
				{ path: "radio-group/radio-group.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["radio", "form", "choice", "selection"],
});
