import { defineComponent } from "../index";

export const reorderList = defineComponent({
	slug: "reorder-list",
	name: "Reorder List",
	description: "Draggable list where the keyboard path is the primary one.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "items",
			type: "ReorderItem[]",
			description: "Items in current order. Bindable.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name for the list.",
			default: "Reorderable list",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged; opacity is not motion.",
		behaviour: [
			"The dragged row drops to 50% opacity so the gap it will leave is visible.",
		],
	},
	a11y: {
		keyboard: ["Alt with Arrow Up or Arrow Down moves the focused item"],
		notes: [
			"Drag and drop is an accelerator, not the interface. The keyboard path exists first and each handle says how to use it in its accessible name.",
			"A list that can only be reordered by dragging cannot be reordered at all by a large number of people.",
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
			entry: "ReorderList",
			files: [
				{ path: "reorder-list/reorder-list.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ReorderList",
			files: [
				{ path: "reorder-list/reorder-list.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["reorder", "list"],
});
