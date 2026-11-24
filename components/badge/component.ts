import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { badge as badgeVariants } from "./variants";

const VARIANTS = [
	"default",
	"secondary",
	"outline",
	"success",
	"warning",
	"destructive",
	"info",
	"gold",
];

export const badge = defineComponent({
	slug: "badge",
	name: "Badge",
	description:
		"Compact label and indicator with semantic colours in soft, solid or ghost fills, an optional leading dot, and corner placement for counts and status dots.",
	category: "base",
	status: "stable",
	variants: variantsOf(badgeVariants, ["variant", "size", "fill", "placement"]),
	props: [
		{
			name: "fill",
			type: '"soft" | "solid" | "ghost"',
			description:
				"How the variant's colour is applied: `soft` tints the surface, `solid` fills it with the saturated colour, `ghost` drops the surface and keeps the coloured text.",
			default: "soft",
			control: { kind: "select", options: ["soft", "solid", "ghost"] },
		},
		{
			name: "placement",
			type: '"none" | "top-right" | "top-left" | "bottom-right" | "bottom-left"',
			description:
				"Pins the badge to a corner of a `BadgeAnchor` as a round indicator. With no content it is a status dot; with a count or icon it grows to fit.",
			default: "none",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Semantic colour. `success`, `warning` and `destructive` carry meaning, not decoration; `gold` marks premium items with a passing shine.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: '"sm" | "default" | "lg" | "xl"',
			description: "Height and horizontal padding.",
			default: "default",
			control: { kind: "select", options: ["sm", "default", "lg", "xl"] },
		},
		{
			name: "dot",
			type: "boolean",
			description: "Show a leading dot tinted to the variant.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "`gold` keeps its tint and drops the shine.",
		behaviour: [
			"`gold`: a highlight sweeps across in about 1.4s, then rests before the next pass.",
		],
	},
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
		},
		svelte: {
			entry: "Badge",
		},
	},
	keywords: ["badge", "tag", "status", "label", "chip"],
});
