import { defineComponent } from "../index";

const TONES = ["default", "primary", "accent"];

export const underlineHoverText = defineComponent({
	slug: "underline-hover-text",
	name: "Underline Hover Text",
	description:
		"A muted baseline, and a bold stroke that sweeps outward from the centre on hover.",
	category: "text",
	status: "stable",
	variants: { tone: TONES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to underline.",
			control: { kind: "text" },
			default: "Underline hover",
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description: "Text and stroke colour.",
			default: "default",
			control: { kind: "select", options: TONES },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the lift and stroke take, in ms.",
			default: 500,
			control: { kind: "number", min: 100, max: 1500, step: 50 },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The stroke still sweeps in, just without the 500ms ease and the lift.",
		behaviour: [
			"On hover the label lifts 2px, and a rounded stroke grows outward from the centre to full width beneath it.",
		],
	},
	a11y: {
		notes: [
			"The baseline and stroke are `aria-hidden`; the label carries the real text.",
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
			entry: "UnderlineHoverText",
			files: [
				{ path: "underline-hover-text/underline-hover-text.tsx", type: "registry:ui" },
				{ path: "underline-hover-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "UnderlineHoverText",
			files: [
				{ path: "underline-hover-text/underline-hover-text.svelte", type: "registry:ui" },
				{ path: "underline-hover-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "underline", "hover", "link"],
});
