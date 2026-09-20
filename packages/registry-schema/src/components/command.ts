import { defineComponent } from "../index";

export const command = defineComponent({
	slug: "command",
	name: "Command Palette",
	description:
		"Filtering command list in a modal dialog, driven entirely from the keyboard.",
	category: "base",
	status: "beta",
	props: [
		{
			name: "open",
			type: "boolean",
			description: "Whether the palette is shown. Bindable.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "items",
			type: "CommandItem[]",
			description: "Commands, optionally with a shortcut hint.",
			control: { kind: "none" },
		},
		{
			name: "placeholder",
			type: "string",
			description: "Input placeholder.",
			default: "Type a command or search\u2026",
			control: { kind: "text" },
		},
		{
			name: "emptyLabel",
			type: "string",
			description: "Shown when nothing matches.",
			default: "No results",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged: there is no animation to reduce.",
		behaviour: [
			"No open or close animation. A palette is opened dozens of times a day, and at that frequency any animation is pure latency.",
			"The highlight resets to the first result on every keystroke.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow keys move through results",
			"Enter runs the highlighted command",
			"Escape closes the palette",
		],
		notes: [
			"aria-activedescendant keeps focus in the input while the list is navigated.",
			"The palette is a native dialog, so the page behind it is inert without extra work.",
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
			entry: "Command",
			files: [
				{ path: "command/command.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Command",
			files: [
				{ path: "command/command.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["command"],
});
