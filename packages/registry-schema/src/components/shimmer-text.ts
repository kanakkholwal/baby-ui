import { defineComponent } from "../index";

const SIZES = ["inherit", "sm", "md", "lg"];

export const shimmerText = defineComponent({
	slug: "shimmer-text",
	name: "Shimmer Text",
	description:
		"Muted text with a bright band sweeping across it, for loading and thinking states.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to shimmer.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "durationMs",
			type: "number",
			description: "One sweep across the text.",
			default: 2000,
			control: { kind: "number", min: 500, max: 5000, step: 100 },
		},
		{
			name: "spread",
			type: "number",
			description: "Band half-width in px per character.",
			default: 2,
			control: { kind: "number", min: 1, max: 6, step: 1 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale; inherit takes the surrounding text size.",
			default: "inherit",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "as",
			type: "string",
			description: "Element to render.",
			default: "p",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The loop stops and the text shows in the muted colour.",
		behaviour: [
			"The band crosses from right to left, linear, and repeats with no pause.",
		],
	},
	licenseOrigin: {
		source: "iconiq",
		url: "https://iconiqui.com",
		license: "MIT",
		copyright: "Copyright (c) 2024-2026 Edwin Vakayil",
	},
	impl: {
		react: {
			entry: "ShimmerText",
			files: [
				{ path: "shimmer-text/shimmer-text.tsx", type: "registry:ui" },
				{ path: "shimmer-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "ShimmerText",
			files: [
				{ path: "shimmer-text/shimmer-text.svelte", type: "registry:ui" },
				{ path: "shimmer-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["shimmer", "loading", "thinking", "gradient", "text"],
});
