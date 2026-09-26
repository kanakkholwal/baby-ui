import { defineComponent } from "../index";

const VARIANTS = ["card", "plain"];
const SIZES = ["sm", "md", "lg"];

export const fisheyeInfiniteGrid = defineComponent({
	slug: "fisheye-infinite-grid",
	name: "Fisheye Infinite Grid",
	description:
		"An endless image grid seen through a fisheye lens; drag with inertia or pan with arrow keys.",
	category: "animated",
	status: "stable",
	variants: { variant: VARIANTS, size: SIZES },
	props: [
		{
			name: "items",
			type: "FisheyeGridItem[]",
			description: "src, alt, optional title and caption. Tiles repeat endlessly.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"`card` frames each image with a caption row; `plain` shows bare images.",
			default: "card",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Height of the grid.",
			default: "md",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "lens",
			type: "number",
			description: "Extra magnification at the centre; 0 is a flat grid.",
			default: 0.8,
			control: { kind: "number", min: 0, max: 3, step: 0.1 },
		},
		{
			name: "tileWidth",
			type: "number",
			description: "Tile width in CSS px at the edge of the lens.",
			default: 150,
			control: { kind: "number", min: 60, max: 320, step: 10 },
		},
		{
			name: "tileHeight",
			type: "number",
			description: "Tile height in CSS px at the edge of the lens.",
			default: 180,
			control: { kind: "number", min: 60, max: 360, step: 10 },
		},
		{
			name: "gap",
			type: "number",
			description: "Space between tiles in CSS px.",
			default: 8,
			control: { kind: "number", min: 0, max: 40, step: 2 },
		},
		{
			name: "inertia",
			type: "number",
			description: "Momentum kept after a drag, 0 to 0.98.",
			default: 0.94,
			control: { kind: "number", min: 0, max: 0.98, step: 0.02 },
		},
		{
			name: "labels",
			type: "Partial<FisheyeInfiniteGridLabels>",
			description: "label: the accessible name and instructions.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Dragging pans 1:1 with no momentum and arrow keys jump a cell at once.",
		behaviour: [
			"A Sarkar-Brown fisheye per axis magnifies the centre by 1 + `lens` and compresses the edges, so rows and columns stay aligned.",
			"Dragging tracks the pointer and keeps `inertia` momentum on release; arrow keys glide one cell and Home recentres.",
			"The loop runs only while the grid moves and stops offscreen or in a hidden tab. Card, border and caption colours come from theme tokens.",
		],
	},
	a11y: {
		keyboard: [
			"Tab focuses the grid",
			"Arrow keys pan by one cell",
			"Home returns to the start",
		],
		notes: [
			'A labelled region with aria-roledescription="gallery" and a visually hidden list of every item.',
			"The canvas is aria-hidden.",
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
			entry: "FisheyeInfiniteGrid",
			files: [
				{
					path: "fisheye-infinite-grid/fisheye-infinite-grid.tsx",
					type: "registry:ui",
				},
				{ path: "fisheye-infinite-grid/fisheye.ts", type: "registry:ui" },
				{ path: "fisheye-infinite-grid/labels.ts", type: "registry:ui" },
				{ path: "fisheye-infinite-grid/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "FisheyeInfiniteGrid",
			files: [
				{
					path: "fisheye-infinite-grid/fisheye-infinite-grid.svelte",
					type: "registry:ui",
				},
				{ path: "fisheye-infinite-grid/fisheye.ts", type: "registry:ui" },
				{ path: "fisheye-infinite-grid/labels.ts", type: "registry:ui" },
				{ path: "fisheye-infinite-grid/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: [
		"gallery",
		"fisheye",
		"lens",
		"grid",
		"drag",
		"inertia",
		"images",
		"infinite",
	],
});
