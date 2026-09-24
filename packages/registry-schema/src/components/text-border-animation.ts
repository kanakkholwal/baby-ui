import { defineComponent } from "../index";

const SIZES = ["sm", "lg"];

export const textBorderAnimation = defineComponent({
	slug: "text-border-animation",
	name: "Text Border Animation",
	description: "A bar slides in under the text on hover, and slides back out on exit.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to underline.",
			control: { kind: "text" },
			default: "Programming",
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale.",
			default: "lg",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the bar takes to sweep in and out, in ms.",
			default: 300,
			control: { kind: "number", min: 100, max: 1000, step: 50 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The bar still appears/disappears, just without the 300ms slide.",
		behaviour: [
			"On hover-in, a bar slides in from the left under the text. On hover-out, a second bar slides out to the right, then both reset after `durationMs`.",
		],
	},
	a11y: { notes: ["The bar is decorative; the label carries the real text."] },

	impl: {
		react: {
			entry: "TextBorderAnimation",
			files: [
				{ path: "text-border-animation/text-border-animation.tsx", type: "registry:ui" },
				{ path: "text-border-animation/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TextBorderAnimation",
			files: [
				{
					path: "text-border-animation/text-border-animation.svelte",
					type: "registry:ui",
				},
				{ path: "text-border-animation/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "underline", "border", "hover"],
});
