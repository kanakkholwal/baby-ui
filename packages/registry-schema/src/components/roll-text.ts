import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const rollText = defineComponent({
	slug: "roll-text",
	name: "Roll Text",
	description:
		"Stacked text layers that roll vertically on hover, like a flip-clock digit.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "Label duplicated across the two stacked roll layers.",
			control: { kind: "text" },
			default: "Roll text",
		},
		{
			name: "groupHover",
			type: "boolean",
			description:
				"Plays when the nearest `[data-roll-group]`/`.group/roll` ancestor is hovered or focused, instead of this element itself.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "disabled",
			type: "boolean",
			description: "Hover and focus do not trigger the roll.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "stagger",
			type: '"none" | "word" | "character"',
			description:
				"Stagger the roll across words or characters. `none` animates the whole label at once.",
			default: "none",
			control: { kind: "select", options: ["none", "word", "character"] },
		},
		{
			name: "staggerMs",
			type: "number",
			description: "Delay step between staggered units.",
			default: 32,
			control: { kind: "number", min: 0, max: 100, step: 4 },
		},
		{
			name: "durationMs",
			type: "number",
			description: "Per-unit roll travel duration.",
			default: 450,
			control: { kind: "number", min: 100, max: 1000, step: 50 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The roll completes instantly to its open state instead of animating.",
		behaviour: [
			"On hover/focus, two stacked copies of the label roll: the top slides up out of view, the bottom rises in to replace it. Re-triggering while open rolls again from the top.",
		],
	},
	a11y: {
		keyboard: [
			"Focusable by default (`tabindex=0`) unless `groupHover` is set, in which case the wrapping link/button should carry focus instead.",
		],
		notes: [
			"The rolling track is `aria-hidden`; a single `sr-only` copy carries the real text once.",
		],
	},

	impl: {
		react: {
			entry: "RollText",
			files: [
				{ path: "roll-text/roll-text.tsx", type: "registry:ui" },
				{ path: "roll-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "RollText",
			files: [
				{ path: "roll-text/roll-text.svelte", type: "registry:ui" },
				{ path: "roll-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "roll", "hover", "flip"],
});
