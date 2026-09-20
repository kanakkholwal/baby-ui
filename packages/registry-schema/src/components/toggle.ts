import { defineComponent } from "../index";

export const toggle = defineComponent({
	slug: "toggle",
	name: "Toggle",
	description: "Two-state button that stays pressed, for formatting and view switches.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "pressed",
			type: "boolean",
			description: "Pressed state. Bindable.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg" | "xl"',
			description: "Control size.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg", "xl"] },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the control.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name when the content is an icon.",
			default: "Bold",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The press scale is removed; the background change stays.",
		behaviour: [
			"Presses to 0.97 like every other button here, so a toggle does not feel different from the buttons beside it.",
		],
	},
	a11y: {
		keyboard: ["Space and Enter toggle"],
		notes: [
			"aria-pressed, not aria-checked: this is a button that stays down, not a checkbox.",
			"An icon-only toggle needs `label`, or it is announced as an unnamed button.",
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
			entry: "Toggle",
			files: [
				{ path: "toggle/toggle.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Toggle",
			files: [
				{ path: "toggle/toggle.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["toggle"],
});
