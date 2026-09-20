import { defineComponent } from "../index";

export const colorPicker = defineComponent({
	slug: "color-picker",
	name: "Color Picker",
	description: "Saturation square, hue strip, hex field and HSV/HSL/RGB channel sliders.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "value",
			type: "string",
			description: "Current colour as hex. Bindable.",
			default: "#7dd3fc",
			control: { kind: "color" },
		},
		{
			name: "format",
			type: '"hsv" | "hsl" | "rgb"',
			description: "Which channel sliders the panel shows. Bindable.",
			default: "hsv",
			control: { kind: "select", options: ["hsv", "hsl", "rgb"] },
		},
		{
			name: "swatches",
			type: "string[]",
			description: "Preset colours.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name for the control.",
			default: "Colour",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Unchanged: dragging is direct manipulation, not animation.",
		behaviour: [
			"The square and the strip track the pointer with no easing, because a lagging handle reads as a dropped input.",
			"A pointer capture keeps the drag alive when the pointer leaves the square, so the colour never freezes mid-gesture.",
		],
	},
	a11y: {
		keyboard: [
			"Tab reaches the hex field, each channel slider and each preset",
			"Arrow keys move the focused channel slider",
		],
		notes: [
			"The square and the hue strip are pointer-only by design; the three channel sliders are their keyboard equivalent and reach every colour.",
			"The hex field is editable and labelled, which is the only path for anyone who cannot use a visual picker.",
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
			entry: "ColorPicker",
			files: [
				{ path: "color-picker/color-picker.tsx", type: "registry:ui" },
				{ path: "lib/color.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ColorPicker",
			files: [
				{ path: "color-picker/color-picker.svelte", type: "registry:ui" },
				{ path: "lib/color.ts", type: "registry:lib" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["color", "picker"],
});
