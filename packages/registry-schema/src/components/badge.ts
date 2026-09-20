import { defineComponent } from "../index";

const VARIANTS = ["default", "secondary", "outline", "success", "warning", "destructive"];

export const badge = defineComponent({
	slug: "badge",
	name: "Badge",
	description:
		"Compact status label with semantic colour variants and an optional leading dot.",
	category: "base",
	status: "stable",
	variants: { variant: VARIANTS, size: ["sm", "md"] },
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Semantic colour. `success`, `warning` and `destructive` carry meaning, not decoration.",
			default: "secondary",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: '"sm" | "md"',
			description: "Height and horizontal padding.",
			default: "md",
			control: { kind: "select", options: ["sm", "md"] },
		},
		{
			name: "dot",
			type: "boolean",
			description: "Show a leading dot tinted to the variant.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	a11y: {
		keyboard: [],
		notes: [
			"A badge is not interactive and takes no role; if its colour is the only carrier of meaning, repeat that meaning in the text.",
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
			entry: "Badge",
			files: [
				{ path: "badge/badge.tsx", type: "registry:ui" },
				{ path: "badge/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "Badge",
			files: [
				{ path: "badge/badge.svelte", type: "registry:ui" },
				{ path: "badge/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["badge", "tag", "status", "label", "chip"],
});
