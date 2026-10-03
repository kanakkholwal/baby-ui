import { defineComponent } from "../index.ts";

const MODES = ["light", "dark"];
const VARIANTS = [
	"plain",
	"waves",
	"pipes",
	"mesh",
	"blur",
	"scatter",
	"mosaic",
	"split",
];

export const ogBrand = defineComponent({
	slug: "og-brand",
	name: "OG Brand",
	description:
		"A 1200x630 brand card: logo and wordmark over a plain field, warped lines, pipes, a gradient mesh, a blurred form or an image collage.",
	category: "og-images",
	status: "stable",
	isNew: true,
	demo: { mode: "auto", frame: "og" },
	variants: { variant: VARIANTS, mode: MODES },
	props: [
		{
			name: "name",
			type: "string",
			description: "Brand name, set as the wordmark; one line.",
			required: true,
			control: { kind: "text", placeholder: "Brand" },
		},
		{
			name: "logo",
			type: "string",
			description:
				"Logo image URL beside the name (above it in `mosaic`). PNG, SVG or WebP.",
			control: { kind: "none" },
		},
		{
			name: "tagline",
			type: "string",
			description: "One quiet line under the wordmark.",
			control: { kind: "text", placeholder: "Tagline" },
		},
		{
			name: "images",
			type: "string[]",
			description:
				"Image URLs for the `scatter` tiles, `mosaic` columns and `split` panel; they repeat to fill.",
			control: { kind: "none" },
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description:
				"Light or dark card, independent of the page theme. Defaults to light.",
			control: { kind: "select", options: MODES },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "The background behind the wordmark.",
			default: "plain",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "A static image; nothing moves.",
		behaviour: [
			"Fixed 1200x630 canvas; every background is CSS gradients, blur, borders or one generated SVG path set, so takumi renders it the same as the browser.",
			"`pipes` and `mesh` draw from `--chart-1..5`; the rest use foreground and background only.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Rendered to an image: give the meta tag a matching og:image:alt, usually the brand name.",
		],
	},
	impl: {
		react: {
			entry: "OgBrand",
			files: [
				{ path: "og-brand/og-brand.tsx", type: "registry:ui" },
				{ path: "og-brand/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "OgBrand",
			files: [
				{ path: "og-brand/og-brand.svelte", type: "registry:ui" },
				{ path: "og-brand/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: [
		"og",
		"open graph",
		"social card",
		"brand",
		"logo",
		"wordmark",
		"takumi",
		"image",
	],
});
