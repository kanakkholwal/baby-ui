import { defineComponent } from "../index";

export const gauge = defineComponent({
	slug: "gauge",
	name: "Gauge",
	description: "Circular meter drawn as a three-quarter dial.",
	category: "base",
	status: "stable",
	props: [
		{
			name: "value",
			type: "number",
			description: "Reading from 0 to 100.",
			default: 68,
			control: { kind: "number", min: 0, max: 100, step: 1 },
		},
		{
			name: "size",
			type: "number",
			description: "Outer diameter in pixels.",
			default: 96,
			control: { kind: "number", min: 48, max: 200, step: 8 },
		},
		{
			name: "thickness",
			type: "number",
			description: "Stroke width in pixels.",
			default: 8,
			control: { kind: "number", min: 2, max: 20, step: 1 },
		},
		{
			name: "tone",
			type: '"default" | "success" | "warning" | "danger"',
			description: "Arc colour.",
			default: "default",
			control: { kind: "select", options: ["default", "success", "warning", "danger"] },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The arc jumps to its value.",
		behaviour: [
			"The arc is three quarters of a circle with a gap at the bottom, so it reads as a dial rather than a ring that failed to close.",
			"stroke-dashoffset eases over 280ms, so a jump reads as the needle moving.",
		],
	},
	a11y: {
		role: "meter",
		keyboard: [],
		notes: [
			"role=meter with min, max and now. A meter is a static reading; a progressbar is a task advancing. Do not swap them.",
			"The numeric value is rendered as text, so the reading is never carried by the arc alone.",
		],
	},
	licenseOrigin: {
		source: "sivir-ui",
		url: "https://github.com/aidan-neel/sivir-ui",
		license: "MIT",
		copyright: "Copyright (c) 2026 Aidan Neel",
	},
	impl: {
		react: {
			entry: "Gauge",
			files: [
				{ path: "gauge/gauge.tsx", type: "registry:ui" },
				{ path: "gauge/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Gauge",
			files: [
				{ path: "gauge/gauge.svelte", type: "registry:ui" },
				{ path: "gauge/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["gauge"],
});
