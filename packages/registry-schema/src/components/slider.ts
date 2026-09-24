import { defineComponent } from "../index";

export const slider = defineComponent({
	slug: "slider",
	name: "Slider",
	description:
		"Range input whose thumb and fill glide on a spring, with sizes, marks and a live value.",
	category: "base",
	status: "stable",
	variants: { size: ["sm", "md", "lg"] },
	props: [
		{
			name: "value",
			type: "number | number[]",
			description:
				"Current value. Bindable. An array renders one thumb per entry (a range slider).",
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
		{
			name: "orientation",
			type: '"horizontal" | "vertical"',
			description: "Layout and which arrow keys move the thumb.",
			default: "horizontal",
			control: { kind: "select", options: ["horizontal", "vertical"] },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Thumb, track and hit-area scale.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "showValue",
			type: "boolean",
			description: "Header with the label and the live value.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "formatValue",
			type: "(value: number) => string",
			description: "Formats the header value.",
			control: { kind: "none" },
		},
		{
			name: "marks",
			type: "{ value: number; label?: string }[]",
			description:
				"Ticks under a horizontal track; a labelled mark jumps there on click.",
			control: { kind: "none" },
		},
		{
			name: "onValueCommit",
			type: "(value: number | number[]) => void",
			description: "Fires once a drag or key press settles.",
			control: { kind: "none" },
		},
		{
			name: "range",
			type: "boolean",
			description:
				"Demo-only: renders two thumbs and a value tuple, since `value` accepts `number | number[]` on the real component (an array renders one thumb per entry).",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Thumb and fill jump straight to the value; the thumb does not grow.",
		behaviour: [
			"The thumb and fill glide to each new value on iconiq's 180/26 spring, sampled into a CSS linear() easing over 611ms, so steps and key presses slide instead of jumping.",
			"The thumb scales to 1.08 on hover and 1.15 while dragging; the track thickens by 2px on hover, over 140ms.",
			"Vertical orientation needs an explicit height on an ancestor (percentage sizing has nothing to resolve against otherwise); the demo sets one directly since it's a one-off layout concern, not a design token.",
		],
	},
	a11y: {
		keyboard: [
			"Arrow keys move by one step",
			"Page Up and Page Down move by ten steps",
			"Home and End jump to the bounds",
		],
		notes: [
			"A real range input underneath (Base UI's Thumb, React) or a real focusable div driving the same keyboard model (bits-ui, Svelte), so every one of those keys works without being reimplemented.",
			"Dragging or clicking a Slider nested inside a Drawer (vaul / vaul-svelte) can conflict with the Drawer's own swipe-to-dismiss gesture tracking; this is a Drawer-level characteristic, not specific to Slider.",
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
				{ path: "slider/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "@base-ui/react"],
		},
		svelte: {
			entry: "Slider",
			files: [
				{ path: "slider/slider.svelte", type: "registry:ui" },
				{ path: "slider/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "bits-ui"],
		},
	},
	keywords: ["slider", "range", "form", "input"],
});
