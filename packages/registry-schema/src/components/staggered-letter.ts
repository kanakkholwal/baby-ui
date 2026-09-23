import { defineComponent } from "../index";

const DIRECTIONS = ["up", "drop"];

export const staggeredLetter = defineComponent({
	slug: "staggered-letter",
	name: "Staggered Letter",
	description: "Letters rise or drop into place one after another.",
	category: "text",
	status: "stable",
	variants: { direction: DIRECTIONS },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to reveal.",
			control: { kind: "text" },
			default: "Animata",
		},
		{
			name: "applyMask",
			type: "boolean",
			description:
				"Shows a faint static copy of the text behind, so layout doesn't shift as letters land.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "delayMs",
			type: "number",
			description: "Delay step between letters.",
			default: 90,
			control: { kind: "number", min: 20, max: 200, step: 10 },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long each letter's entrance takes.",
			default: 500,
			control: { kind: "number", min: 150, max: 1200, step: 50 },
		},
		{
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description: "Which way each letter travels in from.",
			default: "drop",
			control: { kind: "select", options: DIRECTIONS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Letters still fade in, without the travel.",
		behaviour: ["Each letter fades and travels in on mount, staggered by index."],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) Animata",
	},
	impl: {
		react: {
			entry: "StaggeredLetter",
			files: [
				{ path: "staggered-letter/staggered-letter.tsx", type: "registry:ui" },
				{ path: "staggered-letter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "StaggeredLetter",
			files: [
				{ path: "staggered-letter/staggered-letter.svelte", type: "registry:ui" },
				{ path: "staggered-letter/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "stagger", "drop", "rise", "animated"],
});
