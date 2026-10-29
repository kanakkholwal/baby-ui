import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { featureSection as featureSectionVariants } from "./variants";

const VARIANTS = ["cards", "divided", "plain", "split"];

export const featureSection = defineComponent({
	slug: "feature-section",
	name: "Feature Section",
	description:
		"A product's features as cards, ruled cells, open columns, or a list beside a visual, each item an icon, a title and a line of copy.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(featureSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"FeatureSection: bordered cards, hairline cells, open columns, or a ruled list beside FeatureSectionMedia.",
			default: "cards",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"FeatureSection: FeatureSectionHeader (eyebrow, title, description), FeatureSectionList of FeatureSectionItem (icon, title, description), and FeatureSectionMedia in split.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Hover colour changes stay; icons and grids hold still.",
		behaviour: [
			"Cards tint on hover and the grid behind their icon widens.",
			"Divided cells tint and their icon grows; plain icons lift; split icons nudge forward.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2 title; items are a list of h3 headings.",
			"Icons are decorative and hidden from screen readers.",
		],
	},
	guidance: {
		when: ["Explaining what a product does, three to six points at a time."],
		whenNot: [
			{ text: "Mixed-size tiles with art in each.", use: "bento-grid" },
			{ text: "Plan-by-plan feature checks.", use: "comparison-table" },
		],
		responsive: [
			"One column under 36rem, two to 56rem, then three (four in plain).",
			"Split stacks the media under the list below 56rem.",
		],
		performance: ["Static markup; every effect is a CSS hover."],
		ai: [
			"Three or six items in cards and divided, four or eight in plain.",
			"Keep item titles to three words and descriptions to one sentence.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "FeatureSection" },
		svelte: { entry: "FeatureSection" },
	},
	keywords: ["features", "benefits", "grid", "marketing", "landing", "section"],
});
