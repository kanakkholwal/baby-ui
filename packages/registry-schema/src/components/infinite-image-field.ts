import { defineComponent } from "../index";

const SHAPES = ["square", "rounded"];
const LAYOUTS = ["grid", "staggered"];
const SIZES = ["sm", "md", "lg"];

export const infiniteImageField = defineComponent({
	slug: "infinite-image-field",
	name: "Infinite Image Field",
	description:
		"An endless field of images that drifts toward whichever side of the centre the pointer is on.",
	category: "animated",
	status: "stable",
	variants: { shape: SHAPES, layout: LAYOUTS, size: SIZES },
	props: [
		{
			name: "images",
			type: "string[]",
			description: "Image URLs; each cell always shows the same one.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "shape",
			type: SHAPES.map((v) => `"${v}"`).join(" | "),
			description: "Tile corners.",
			default: "rounded",
			control: { kind: "select", options: SHAPES },
		},
		{
			name: "layout",
			type: LAYOUTS.map((v) => `"${v}"`).join(" | "),
			description: "`staggered` offsets every other column by half a tile.",
			default: "grid",
			control: { kind: "select", options: LAYOUTS },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Height of the field.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "imageWidth",
			type: "number",
			description: "Tile width in CSS px.",
			default: 160,
			control: { kind: "number", min: 60, max: 320, step: 10 },
		},
		{
			name: "imageHeight",
			type: "number",
			description: "Tile height in CSS px.",
			default: 220,
			control: { kind: "number", min: 60, max: 400, step: 10 },
		},
		{
			name: "gap",
			type: "number",
			description: "Space between tiles in CSS px.",
			default: 24,
			control: { kind: "number", min: 0, max: 64, step: 2 },
		},
		{
			name: "maxSpeed",
			type: "number",
			description: "Top drift speed in CSS px per frame at 60fps.",
			default: 5,
			control: { kind: "number", min: 1, max: 20, step: 1 },
		},
		{
			name: "smoothing",
			type: "number",
			description: "How quickly the drift follows the pointer, 0 to 1 per frame.",
			default: 0.07,
			control: { kind: "number", min: 0.01, max: 0.5, step: 0.01 },
		},
		{
			name: "labels",
			type: "Partial<InfiniteImageFieldLabels>",
			description: "label: the accessible name and instructions.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "A static field; arrow keys jump one tile at a time.",
		behaviour: [
			"The pointer's offset from the centre sets a drift velocity up to `maxSpeed`, eased by `smoothing`; a small dead zone in the middle lets it rest.",
			"Held arrow keys drift the same way. The loop stops once the drift settles, offscreen or in a hidden tab.",
			"Placeholders and borders use theme tokens and repaint on theme change.",
		],
	},
	a11y: {
		keyboard: ["Tab focuses the field", "Hold arrow keys to drift"],
		notes: [
			"A labelled region; the canvas is aria-hidden and the images are decorative.",
		],
	},
	licenseOrigin: {
		source: "componentry",
		url: "https://componentry.dev",
		license: "MIT",
		copyright: "Copyright (c) 2026 Harsh Jadhav",
	},
	impl: {
		react: {
			entry: "InfiniteImageField",
			files: [
				{ path: "infinite-image-field/infinite-image-field.tsx", type: "registry:ui" },
				{ path: "infinite-image-field/field.ts", type: "registry:ui" },
				{ path: "infinite-image-field/labels.ts", type: "registry:ui" },
				{ path: "infinite-image-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "InfiniteImageField",
			files: [
				{
					path: "infinite-image-field/infinite-image-field.svelte",
					type: "registry:ui",
				},
				{ path: "infinite-image-field/field.ts", type: "registry:ui" },
				{ path: "infinite-image-field/labels.ts", type: "registry:ui" },
				{ path: "infinite-image-field/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["images", "field", "infinite", "drift", "canvas", "gallery", "cursor"],
});
