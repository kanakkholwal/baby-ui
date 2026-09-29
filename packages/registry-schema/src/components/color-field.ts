import { defineComponent } from "../index.ts";

const SIZES = ["sm", "md", "lg"];

export const colorField = defineComponent({
	slug: "color-field",
	name: "Color Field",
	description:
		"Hex colour input with a swatch that opens the full Color Picker; typed values commit on blur or Enter.",
	category: "base",
	status: "experimental",
	demo: { mode: "auto" },
	variants: { size: SIZES },
	props: [
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Field height and swatch size, matching InputGroup.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "value",
			type: "string",
			description:
				"Hex colour. Controlled with onValueChange (React) or bindable (Svelte).",
			default: "#000000",
			control: { kind: "none" },
		},
		{
			name: "picker",
			type: "boolean",
			description:
				"The swatch opens the Color Picker in a popover; off, it only previews.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "label",
			type: "string",
			description: "Accessible name for the input and the picker trigger.",
			default: "Colour",
			control: { kind: "text", placeholder: "Brand colour" },
		},
		{
			name: "invalid",
			type: "boolean",
			description: "Force the invalid ring; an unparseable draft sets it on its own.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the input and the picker trigger.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The swatch's press squish and colour transition turn off.",
		behaviour: [
			"Typing keeps a draft; it commits on blur or Enter when it parses as #rgb or #rrggbb, and Escape or an invalid draft reverts.",
			"Arrow keys step the 24-bit hex by 1 and Page keys by 16, as React Aria's ColorField.",
		],
	},
	a11y: {
		keyboard: [
			"ArrowUp / ArrowDown step the colour by 1",
			"PageUp / PageDown step by 16",
			"Enter commits, Escape reverts the draft",
		],
		notes: [
			"The input carries aria-invalid while the draft is not a colour.",
			"The swatch is a real popover trigger with its own label; the picker inside is the Color Picker.",
		],
	},
	impl: {
		react: {
			entry: "ColorField",
			files: [
				{ path: "color-field/color-field.tsx", type: "registry:ui" },
				{ path: "color-field/core.ts", type: "registry:ui" },
				{ path: "color-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group", "popover", "color-picker"],
		},
		svelte: {
			entry: "ColorField",
			files: [
				{ path: "color-field/color-field.svelte", type: "registry:ui" },
				{ path: "color-field/core.ts", type: "registry:ui" },
				{ path: "color-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group", "popover", "color-picker"],
		},
	},
	keywords: ["color", "colour", "hex", "field", "input", "swatch"],
});
