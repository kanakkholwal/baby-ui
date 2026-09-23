import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const fineTuneCard = defineComponent({
	slug: "fine-tune-card",
	name: "Fine Tune Card",
	description:
		"A compact interactive inspector: scrub-able number fields, a layout switch, a type select.",
	category: "advanced",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "fields",
			type: "FineTuneField[]",
			description:
				"The scrub-able properties shown in the layout grid, rendered in pairs.",
			control: { kind: "none" },
		},
		{
			name: "options",
			type: "string[]",
			description: "Options offered in the Type select; the row is hidden when empty.",
			control: { kind: "none" },
		},
		{
			name: "labels",
			type: "FineTuneCardLabels",
			description: "Prominent copy strings, merged over generic defaults.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Card's max width.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "state",
			type: "FineTuneState",
			description:
				"Controlled editable state (`segment`/`values`/`type`). Omit to let the card own it.",
			control: { kind: "none" },
		},
		{
			name: "onChange",
			type: "(state: FineTuneState) => void",
			description: "Fired with the full editable state whenever the user edits it.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			'The layout switch\'s sliding thumb and the "Edited" pop-in both drop; the shimmering "Adjust" label freezes.',
		behaviour: [
			"A scrub handle drags (pointer), arrows (Shift for ×10) or types directly to change a value; an edited field tints and rings.",
			"The layout switch's thumb slides under the active segment rather than the icons swapping colour alone.",
		],
	},
	a11y: {
		keyboard: [
			"Tab reaches each scrub handle, the layout segments and the type select",
			"Arrow keys (Shift for ×10) adjust a focused scrub handle",
		],
		notes: [
			'Each scrub handle carries `role="slider"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, so its current value is announced, not just shown.',
			"The type select is a real Select, so its own keyboard and screen-reader semantics aren't reimplemented here.",
		],
	},
	licenseOrigin: {
		source: "beUI",
		url: "https://beui.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 beUI",
	},
	impl: {
		react: {
			entry: "FineTuneCard",
			files: [
				{ path: "fine-tune-card/fine-tune-card.tsx", type: "registry:ui" },
				{ path: "fine-tune-card/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["select"],
		},
		svelte: {
			entry: "FineTuneCard",
			files: [
				{ path: "fine-tune-card/fine-tune-card.svelte", type: "registry:ui" },
				{ path: "fine-tune-card/types.ts", type: "registry:ui" },
				{ path: "fine-tune-card/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["select"],
		},
	},
	keywords: ["inspector", "scrub", "number", "properties", "editor"],
});
