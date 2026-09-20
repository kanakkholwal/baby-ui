import { defineComponent } from "../index";

export const select = defineComponent({
	slug: "select",
	name: "Select",
	description:
		"Listbox that matches its trigger width, keeps the selected option in view and flips when needed.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "value",
			type: "string",
			description: "Selected value. Bindable.",
			control: { kind: "text" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Shown when nothing is selected.",
			default: "Select an option",
			control: { kind: "text" },
		},
		{
			name: "placement",
			type: "Placement",
			description: "Preferred side. Flips automatically when there is not room.",
			default: "bottom-start",
			control: {
				kind: "select",
				options: [
					"top",
					"bottom",
					"left",
					"right",
					"bottom-start",
					"bottom-end",
					"top-start",
				],
			},
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The list appears without the scale.",
		behaviour: [
			"The list matches the trigger's width, so the option text lines up with the value it replaces.",
			"Available height is measured, so a select near the bottom of the page scrolls internally rather than overflowing.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow Down or Enter opens the list from the trigger",
			"Arrow keys move between options",
			"Escape closes and returns focus to the trigger",
		],
		notes: [
			"The trigger is role=combobox with aria-haspopup=listbox, which is the documented pattern for a custom select.",
			"The list opens with focus on the selected option, not the first one.",
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
			entry: "Select",
			files: [
				{ path: "select/select.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "Select",
			files: [
				{ path: "select/select.svelte", type: "registry:ui" },
				{ path: "select/select-trigger.svelte", type: "registry:ui" },
				{ path: "select/select-value.svelte", type: "registry:ui" },
				{ path: "select/select-content.svelte", type: "registry:ui" },
				{ path: "select/select-item.svelte", type: "registry:ui" },
				{ path: "select/select-group.svelte", type: "registry:ui" },
				{ path: "select/select-label.svelte", type: "registry:ui" },
				{ path: "select/select-separator.svelte", type: "registry:ui" },
				{ path: "select/context.ts", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["select", "overlay"],
});
