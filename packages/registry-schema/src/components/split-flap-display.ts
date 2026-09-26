import { defineComponent } from "../index";

const VARIANTS = ["solid", "card"];
const SIZES = ["sm", "md", "lg"];
const INDICATORS = ["none", "success", "primary", "warning", "destructive"];
const union = (values: string[]) => values.map((v) => `"${v}"`).join(" | ");

export const splitFlapDisplay = defineComponent({
	slug: "split-flap-display",
	name: "Split Flap Display",
	description:
		"A departures-board display whose cells flip through the character drum to each new value.",
	category: "animated",
	status: "stable",
	variants: { variant: VARIANTS, size: SIZES, indicator: INDICATORS },
	props: [
		{
			name: "value",
			type: "string",
			description: "Board text; a newline starts a new row. Uppercased.",
			required: true,
			default: "DEPARTURES",
			control: { kind: "text" },
		},
		{
			name: "columns",
			type: "number",
			description: "Cells per row; shorter rows pad with blanks, longer ones are cut.",
			default: 14,
			control: { kind: "number", min: 4, max: 20, step: 1 },
		},
		{
			name: "variant",
			type: union(VARIANTS),
			description: "Inverted solid board or a bordered card board.",
			default: "solid",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: union(SIZES),
			description: "Cell size.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "indicator",
			type: union(INDICATORS),
			description: "Colour of the side strips on each row; `none` hides them.",
			default: "success",
			control: { kind: "select", options: INDICATORS },
		},
		{
			name: "stepMs",
			type: "number",
			description: "Time for one flap to fall, per character step.",
			default: 60,
			control: { kind: "number", min: 20, max: 300, step: 10 },
		},
		{
			name: "staggerMs",
			type: "number",
			description: "Delay between neighbouring cells starting, for a wave.",
			default: 30,
			control: { kind: "number", min: 0, max: 150, step: 5 },
		},
		{
			name: "characters",
			type: "string",
			description: "Drum order each cell flips through. Glyphs outside it snap in.",
			default: " A-Z 0-9 $.,!?:;+-=%&#@/'",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Cells show the new value immediately with no flaps.",
		behaviour: [
			"Each cell steps forward through the drum from its current glyph to the target, one flap per step.",
			"Per step the old top half folds down on rotateX, then the new bottom half lands.",
			"Cells start staggerMs apart, left to right, so a change rolls across the row.",
			"On mount every cell flips up from blank.",
		],
	},
	a11y: {
		keyboard: [],
		notes: ["The board is aria-hidden; a visually hidden copy carries the value once."],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "SplitFlapDisplay",
			files: [
				{ path: "split-flap-display/split-flap-display.tsx", type: "registry:ui" },
				{ path: "split-flap-display/flap.ts", type: "registry:ui" },
				{ path: "split-flap-display/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "SplitFlapDisplay",
			files: [
				{ path: "split-flap-display/split-flap-display.svelte", type: "registry:ui" },
				{ path: "split-flap-display/split-flap-cell.svelte", type: "registry:ui" },
				{ path: "split-flap-display/flap.ts", type: "registry:ui" },
				{ path: "split-flap-display/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["split flap", "solari", "departures", "board", "flip", "airport"],
});
