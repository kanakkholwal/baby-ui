import { defineComponent } from "../index";

export const slider = defineComponent({
	slug: "slider",
	name: "Slider",
	description: "Range input with a filled track and a thumb that grows on interaction.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "value",
			type: "number",
			description: "Current value. Bindable.",
			default: 50,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
		{
			name: "min",
			type: "number",
			description: "Lower bound.",
			default: 0,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
		{
			name: "max",
			type: "number",
			description: "Upper bound.",
			default: 100,
			control: { kind: "number", min: 0, max: 200, step: 10 },
		},
		{
			name: "step",
			type: "number",
			description: "Increment.",
			default: 1,
			control: { kind: "number", min: 1, max: 25, step: 1 },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the control.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The thumb does not grow; the fill still tracks the value.",
		behaviour: [
			"The thumb scales to 1.15 on hover and 1.25 while dragging, over 140ms.",
			"The fill has no transition: it must track the pointer exactly or the control feels broken.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow keys move by one step",
			"Page Up and Page Down move by ten steps",
			"Home and End jump to the bounds",
		],
		notes: [
			"A real range input underneath, so every one of those keys works without being reimplemented.",
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
			entry: "Slider",
			files: [
				{ path: "slider/slider.tsx", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "Slider",
			files: [
				{ path: "slider/slider.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["slider", "range", "form", "input"],
});
