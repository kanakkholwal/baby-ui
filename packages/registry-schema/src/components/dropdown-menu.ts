import { defineComponent } from "../index";

export const dropdownMenu = defineComponent({
	slug: "dropdown-menu",
	name: "Dropdown Menu",
	description:
		"Anchored action menu with roving focus, destructive styling and outside dismissal.",
	category: "base",
	status: "stable",
	props: [
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
		{
			name: "open",
			type: "boolean",
			description: "Controlled open state. Bindable.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The menu appears without the scale.",
		behaviour: [
			"Opens anchored to the trigger and flips above it when there is no room below.",
			"Focus moves to the first item on open and back to the trigger on close, so the keyboard never lands nowhere.",
		],
	},
	a11y: {
		role: "menu",
		keyboard: [
			"Arrow keys move between items, wrapping at both ends",
			"Home and End jump to the first and last item",
			"Escape closes the menu and returns focus to the trigger",
		],
		notes: [
			"The trigger declares aria-haspopup=menu, so a screen reader announces that it opens something.",
			"Disabled items are skipped by the roving focus rather than focused and announced as unavailable.",
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
			entry: "DropdownMenu",
			files: [
				{ path: "dropdown-menu/dropdown-menu.tsx", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
		svelte: {
			entry: "DropdownMenu",
			files: [
				{ path: "dropdown-menu/dropdown-menu.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/dropdown-menu-trigger.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/dropdown-menu-content.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/dropdown-menu-item.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/dropdown-menu-label.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/dropdown-menu-separator.svelte", type: "registry:ui" },
				{ path: "dropdown-menu/context.ts", type: "registry:ui" },
				{ path: "lib/anchor.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "@floating-ui/dom"],
		},
	},
	keywords: ["dropdown", "menu", "overlay"],
});
