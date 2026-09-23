import { defineComponent } from "../index";

const DIRECTIONS = ["up", "down"];

export const waveReveal = defineComponent({
	slug: "wave-reveal",
	name: "Wave Reveal",
	description:
		"Reveals letters or words one by one with a wave effect and an optional blur.",
	category: "text",
	status: "stable",
	variants: { direction: DIRECTIONS },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to reveal.",
			control: { kind: "text" },
			default: "Reveal letter or word one by one",
		},
		{
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description: "Which way each unit drifts in from.",
			default: "down",
			control: { kind: "select", options: DIRECTIONS },
		},
		{
			name: "mode",
			type: '"letter" | "word"',
			description: "Stagger per letter, or per whole word.",
			default: "letter",
			control: { kind: "select", options: ["letter", "word"] },
		},
		{
			name: "blur",
			type: "boolean",
			description: "Adds a blur-to-sharp resolve alongside the fade/drift.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "staggerMs",
			type: "number",
			description: "Delay step between units.",
			default: 50,
			control: { kind: "number", min: 10, max: 150, step: 10 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Units still fade in on a fixed schedule; no drift or blur.",
		behaviour: [
			"Each letter or word fades and drifts in on mount, offset by its own animation-delay so the stagger reads as a wave crossing the line.",
		],
	},
	a11y: {
		notes: [
			"The per-unit spans are `aria-hidden`; a single `sr-only` copy carries the real text once.",
		],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) Animata",
	},
	impl: {
		react: {
			entry: "WaveReveal",
			files: [
				{ path: "wave-reveal/wave-reveal.tsx", type: "registry:ui" },
				{ path: "wave-reveal/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "WaveReveal",
			files: [
				{ path: "wave-reveal/wave-reveal.svelte", type: "registry:ui" },
				{ path: "wave-reveal/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "wave", "reveal", "stagger"],
});
