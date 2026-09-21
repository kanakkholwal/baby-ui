import { defineComponent } from "../index";

export const shortcut = defineComponent({
	slug: "shortcut",
	name: "Shortcut",
	description:
		"Key caps for a shortcut that also fires it: the combo clicks the button it sits in.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "shortcut",
			type: "string",
			description:
				"Tokens joined by +, such as cmd+k or shift+enter. Rendered as glyph caps.",
			default: "cmd+n",
			control: { kind: "text", placeholder: "cmd+k" },
		},
		{
			name: "ontrigger",
			type: "(event: KeyboardEvent) => void",
			description:
				"Runs on the combo. Without it, the enclosing button or link is clicked.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Key cap size.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
		},
	],
	a11y: {
		keyboard: [
			"The combo itself clicks the enclosing button, unless focus is in a text field",
		],
		notes: [
			"The glyphs are aria-hidden and a spoken form is provided in visually hidden text, so a screen reader says Command K rather than reading the symbol names.",
			"Single-key combos are ignored while typing in an input or textarea; Enter and Escape still fire from inputs.",
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
				{ path: "lib/shortcut.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Shortcut",
			files: [
				{ path: "shortcut/shortcut.svelte", type: "registry:ui" },
				{ path: "lib/shortcut.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["shortcut"],
});
