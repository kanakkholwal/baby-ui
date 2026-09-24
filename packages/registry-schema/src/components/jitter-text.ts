import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];

export const jitterText = defineComponent({
	slug: "jitter-text",
	name: "Jitter Text",
	description: "A small, continuous x/y/rotate wobble.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to jitter.",
			control: { kind: "text" },
			default: "Jitter",
		},
		{
			name: "durationSeconds",
			type: "number",
			description: "Wobble cycle length.",
			default: 0.6,
			control: { kind: "number", min: 0.2, max: 2, step: 0.1 },
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
		reducedMotion: "The wobble stops; the text stays put.",
		behaviour: [
			"A continuous, small x/y/rotate wobble, alternating direction each cycle.",
		],
	},

	impl: {
		react: {
			entry: "JitterText",
			files: [
				{ path: "jitter-text/jitter-text.tsx", type: "registry:ui" },
				{ path: "jitter-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "JitterText",
			files: [
				{ path: "jitter-text/jitter-text.svelte", type: "registry:ui" },
				{ path: "jitter-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "jitter", "wobble", "animated"],
});
