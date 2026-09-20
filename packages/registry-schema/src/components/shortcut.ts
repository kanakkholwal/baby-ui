import { defineComponent } from "../index";

export const shortcut = defineComponent({
	slug: "shortcut",
	name: "Shortcut",
	description: "Keyboard shortcut hint that reads correctly to screen readers.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "keys",
			type: "string[]",
			description: "Key glyphs in press order.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: '"sm" | "md"',
			description: "Key cap size.",
			default: "md",
			control: { kind: "select", options: ["sm", "md"] },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"The glyphs are aria-hidden and a spoken form is provided in visually hidden text, so a screen reader says Command K rather than reading the symbol names.",
			"Glyphs are rendered as kbd elements, which is what the element is for.",
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
			entry: "Shortcut",
			files: [
				{ path: "shortcut/shortcut.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Shortcut",
			files: [
				{ path: "shortcut/shortcut.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["shortcut"],
});
