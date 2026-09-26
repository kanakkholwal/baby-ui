import { defineComponent } from "../index";

const VARIANTS = ["realistic", "cartoon", "minimal", "cyber"];
const SIZES = ["sm", "md", "lg"];
const union = (values: string[]) => values.map((v) => `"${v}"`).join(" | ");

export const eyeTracking = defineComponent({
	slug: "eye-tracking",
	name: "Eye Tracking",
	description: "A row of eyes whose irises follow the pointer and blink now and then.",
	category: "animated",
	status: "stable",
	variants: { variant: VARIANTS, size: SIZES },
	props: [
		{
			name: "variant",
			type: union(VARIANTS),
			description: "Eye style.",
			default: "realistic",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: union(SIZES),
			description: "Eye width and gap.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "eyeCount",
			type: "number",
			description: "Number of eyes.",
			default: 2,
			control: { kind: "number", min: 1, max: 6, step: 1 },
		},
		{
			name: "pupilRange",
			type: "number",
			description: "How far the iris may travel toward the rim, 0 to 1.",
			default: 0.7,
			control: { kind: "number", min: 0, max: 1, step: 0.05 },
		},
		{
			name: "blink",
			type: "boolean",
			description: "Blink on a loop.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "blinkInterval",
			type: "number",
			description: "Time between blinks in ms.",
			default: 4000,
			control: { kind: "number", min: 1500, max: 10000, step: 500 },
		},
		{
			name: "reactivePupil",
			type: "boolean",
			description: "Pupils widen as the pointer nears.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "reflection",
			type: "boolean",
			description: "Light glints on the iris.",
			default: true,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Irises stay centred and the eyes never blink.",
		behaviour: [
			"Pointer moves and scrolls write offset, fibre-rotation and pupil-scale variables per eye, rAF-throttled; CSS transitions ease them.",
			"The blink is a CSS keyframe that closes the eye for the last few percent of each cycle.",
			"The cyber variant sweeps a scan line with a CSS keyframe.",
			"Nothing is computed while the eyes are off screen.",
		],
	},
	a11y: {
		keyboard: [],
		notes: ["Purely decorative: the eyes are aria-hidden."],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "EyeTracking",
			files: [
				{ path: "eye-tracking/eye-tracking.tsx", type: "registry:ui" },
				{ path: "eye-tracking/eyes.ts", type: "registry:ui" },
				{ path: "eye-tracking/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "EyeTracking",
			files: [
				{ path: "eye-tracking/eye-tracking.svelte", type: "registry:ui" },
				{ path: "eye-tracking/eyes.ts", type: "registry:ui" },
				{ path: "eye-tracking/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["eyes", "pointer", "cursor", "follow", "blink", "playful"],
});
