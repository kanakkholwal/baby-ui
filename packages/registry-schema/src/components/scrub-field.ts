import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];
const TONES = ["default", "edited"];

export const scrubField = defineComponent({
	slug: "scrub-field",
	name: "Scrub Field",
	description:
		"A number input whose label is a horizontal drag handle: drag, arrow keys (Shift for ×10), or type directly.",
	category: "base",
	status: "stable",
	variants: { size: SIZES, tone: TONES },
	props: [
		{
			name: "label",
			type: "string",
			description: "Accessible name, and the text on the draggable scrub handle.",
			control: { kind: "text" },
			default: "W",
		},
		{
			name: "value",
			type: "number",
			description: "Controlled value. Omit to let the field own it.",
			control: { kind: "none" },
		},
		{
			name: "defaultValue",
			type: "number",
			description: "Uncontrolled starting value.",
			default: 0,
			control: { kind: "number", min: 0, max: 999, step: 1 },
		},
		{
			name: "onValueChange",
			type: "(value: number) => void",
			description: "Fired on drag, arrow keys or typing.",
			control: { kind: "none" },
		},
		{
			name: "min",
			type: "number",
			description: "Lower bound.",
			control: { kind: "number", min: 0, max: 999, step: 1 },
		},
		{
			name: "max",
			type: "number",
			description: "Upper bound.",
			default: 999,
			control: { kind: "number", min: 0, max: 999, step: 1 },
		},
		{
			name: "step",
			type: "number",
			description: "Increment per arrow key press or unit of drag distance.",
			default: 1,
			control: { kind: "number", min: 1, max: 25, step: 1 },
		},
		{
			name: "largeStep",
			type: "number",
			description: "Increment per arrow key press while Shift is held.",
			default: 10,
			control: { kind: "number", min: 1, max: 100, step: 1 },
		},
		{
			name: "suffix",
			type: "string",
			description: 'Unit shown after the value, e.g. "%" or "px".',
			control: { kind: "text" },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Field height and type scale.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description:
				"`edited` tints and rings the field; callers set it when the value differs from a baseline they track themselves.",
			default: "default",
			control: { kind: "select", options: TONES },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Disable dragging, keyboard stepping and typing.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"No motion to reduce; the tone change on `edited` is an instant colour swap.",
		behaviour: [
			"Dragging the label left/right steps the value by `step` per ~2px of pointer movement.",
			"Arrow keys step by `step` (Shift for `largeStep`); typing a number commits it directly.",
		],
	},
	a11y: {
		keyboard: [
			"Tab reaches the scrub handle",
			"Arrow keys (Shift for ×10) adjust the value",
			"The value input accepts direct typing",
		],
		notes: [
			'The handle carries `role="slider"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.',
			"React rides Base UI's NumberField (Root/ScrubArea/Input); bits-ui ships no equivalent primitive, so the Svelte port hand-rolls the same pointer and keyboard model.",
		],
	},
	impl: {
		react: {
			entry: "ScrubField",
			files: [
				{ path: "scrub-field/scrub-field.tsx", type: "registry:ui" },
				{ path: "scrub-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants", "@base-ui/react"],
		},
		svelte: {
			entry: "ScrubField",
			files: [
				{ path: "scrub-field/scrub-field.svelte", type: "registry:ui" },
				{ path: "scrub-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["number", "input", "drag", "scrub", "stepper"],
});
