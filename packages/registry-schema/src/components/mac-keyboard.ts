import { defineComponent } from "../index";

const VARIANTS = ["default", "inverted"];
const SIZES = ["sm", "md"];
const union = (values: string[]) => values.map((v) => `"${v}"`).join(" | ");

export const macKeyboard = defineComponent({
	slug: "mac-keyboard",
	name: "Mac Keyboard",
	description:
		"A full MacBook keyboard whose keys press down with the physical keyboard or the pointer.",
	category: "animated",
	status: "stable",
	variants: { variant: VARIANTS, size: SIZES },
	props: [
		{
			name: "pressed",
			type: "string[]",
			description:
				"KeyboardEvent.code values held down. Controlled with onPressedChange in React, bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "defaultPressed",
			type: "string[]",
			description: "Initial pressed keys when uncontrolled (React).",
			default: "[]",
			control: { kind: "none" },
		},
		{
			name: "onPressedChange",
			type: "(pressed: string[]) => void",
			description: "Fires on every key going down or up.",
			control: { kind: "none" },
		},
		{
			name: "listen",
			type: "boolean",
			description: "Mirror the physical keyboard while the page has focus.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "variant",
			type: union(VARIANTS),
			description:
				"Light caps on a muted deck, or caps inverted to the foreground colour.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: union(SIZES),
			description: "Overall scale: minimum width, gaps and legend sizes.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "labels",
			type: "Partial<MacKeyboardLabels>",
			description:
				"Modifier legends (esc, delete, tab, caps lock...) and the accessible name.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Keys still show the pressed state, without the transition.",
		behaviour: [
			"A pressed key drops 1px, shrinks to 98% and loses its shadow over --duration-press.",
			"Caps lock lights its LED while held.",
			"Losing window focus releases every key.",
		],
	},
	a11y: {
		role: "img",
		keyboard: ["Physical key presses light the matching key when listen is on"],
		notes: ["The keyboard is one labelled image; the keys are presentational."],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "MacKeyboard",
			files: [
				{ path: "mac-keyboard/mac-keyboard.tsx", type: "registry:ui" },
				{ path: "mac-keyboard/layout.ts", type: "registry:ui" },
				{ path: "mac-keyboard/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "MacKeyboard",
			files: [
				{ path: "mac-keyboard/mac-keyboard.svelte", type: "registry:ui" },
				{ path: "mac-keyboard/layout.ts", type: "registry:ui" },
				{ path: "mac-keyboard/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["keyboard", "mac", "keys", "keycap", "macbook", "typing"],
});
