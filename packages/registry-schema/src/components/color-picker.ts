import { defineComponent } from "../index";

export const colorPicker = defineComponent({
	slug: "color-picker",
	name: "Color Picker",
	description: "Swatches plus the native colour input and a hex field.",
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
	a11y: {
		keyboard: ["Tab reaches the swatch, the hex field and each preset"],
		notes: [
			"Built on a real colour input, so the platform picker, the eyedropper and any OS-level accessibility come free.",
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
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
		svelte: {
			entry: "ColorPicker",
			files: [
				{ path: "color-picker/color-picker.svelte", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge"],
		},
	},
	keywords: ["color", "picker"],
});
