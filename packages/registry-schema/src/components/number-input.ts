import { defineComponent } from "../index.ts";

export const numberInput = defineComponent({
	slug: "number-input",
	name: "Number Input",
	description:
		"A stepper with hold-to-repeat buttons, keyboard steps, Intl formatting and a label you can drag to scrub.",
	category: "base",
	status: "beta",
	variants: { size: ["sm", "md", "lg"] },
	props: [
		{
			name: "value",
			type: "number | null",
			description: "Current value; `null` is an empty field. Bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "min",
			type: "number",
			description: "Lowest value.",
			control: { kind: "none" },
		},
		{
			name: "max",
			type: "number",
			description: "Highest value.",
			control: { kind: "none" },
		},
		{
			name: "step",
			type: "number",
			description: "Arrow and button step.",
			default: 1,
			control: { kind: "none" },
		},
		{
			name: "largeStep",
			type: "number",
			description: "PageUp/PageDown and Shift+Arrow step.",
			default: 10,
			control: { kind: "none" },
		},
		{
			name: "formatOptions",
			type: "Intl.NumberFormatOptions",
			description: "Display format, e.g. currency or percent.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description: "Visible label. Drag it sideways to scrub the value.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable the field.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		role: "spinbutton",
		keyboard: [
			"ArrowUp and ArrowDown step by step",
			"Shift+Arrow, PageUp and PageDown step by the large step",
			"Home and End jump to min and max",
		],
		notes: [
			"The field is a spinbutton with the formatted value as its value text.",
			"The minus and plus buttons repeat while held and stay out of the tab order; the keys cover them.",
		],
	},
	impl: {
		react: {
			entry: "NumberInput",
			files: [
				{ path: "number-input/number-input.tsx", type: "registry:ui" },
				{ path: "number-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "@base-ui/react"],
		},
		svelte: {
			entry: "NumberInput",
			files: [
				{ path: "number-input/number-input.svelte", type: "registry:ui" },
				{ path: "number-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["number input", "stepper", "spinbutton", "quantity", "currency", "scrub"],
});
