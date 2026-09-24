import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const ticker = defineComponent({
	slug: "ticker",
	name: "Ticker",
	description: "Digit-odometer roll for a changing numeric value.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "value",
			type: "string",
			description:
				"The value to display. Each digit rolls to its new row when this changes.",
			control: { kind: "text" },
			default: "1,024",
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long each digit's roll takes.",
			default: 500,
			control: { kind: "number", min: 100, max: 1500, step: 50 },
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
		reducedMotion: "Digits still switch, just without the roll.",
		behaviour: [
			"Each digit is a 10-row strip that translates to the active row; non-digit characters (commas, signs) pass through unanimated.",
			"A CSS transition, not a keyframe animation, so a new `value` replays it without remounting.",
			"Digits roll up from 0 on mount and are keyed from the right, so a value gaining a digit keeps the rest in place.",
		],
	},
	a11y: {
		notes: ["The digit strips are hidden; an sr-only span carries the value."],
	},

	impl: {
		react: {
			entry: "Ticker",
			files: [
				{ path: "ticker/ticker.tsx", type: "registry:ui" },
				{ path: "ticker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Ticker",
			files: [
				{ path: "ticker/ticker.svelte", type: "registry:ui" },
				{ path: "ticker/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "ticker", "odometer", "number", "roll"],
});
