import { defineComponent } from "../index";

export const reorderList = defineComponent({
	slug: "reorder-list",
	name: "Reorder List",
	description: "Draggable list where the keyboard path is the primary one.",
	category: "base",
	status: "alpha",
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
		{
			name: "disabled",
			type: "boolean",
			description: "Freeze the order and block both gestures.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Rows swap instantly; the lifted row still follows the pointer.",
		behaviour: [
			"The lifted row follows the pointer exactly, with no easing, and every other row FLIPs to its new place over 180ms.",
			"Row centres are measured once per gesture, so the drop index never chases rows that are still animating.",
			"A drag only starts after 5px of travel, so a click on a row is still a click.",
		],
	},
	a11y: {
		keyboard: [
			"Space or Enter grabs the focused row",
			"Arrow Up and Arrow Down move a grabbed row",
			"Escape restores the order the gesture started from",
		],
		notes: [
			"Drag and drop is an accelerator, not the interface. The keyboard path exists first and every row describes it.",
			"A live region announces the label and the new position after each move, so the order is legible without sight.",
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
				{ path: "lib/flip.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ReorderList",
			files: [
				{ path: "reorder-list/reorder-list.svelte", type: "registry:ui" },
				{ path: "lib/flip.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["reorder", "list"],
});
