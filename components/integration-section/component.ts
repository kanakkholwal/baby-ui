import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { integrationSection as integrationSectionVariants } from "./variants";

const VARIANTS = ["grid", "cluster"];

export const integrationSection = defineComponent({
	slug: "integration-section",
	name: "Integration Section",
	description:
		"The tools a product connects to, as cards with a line of copy and a link, or a cloud of logo tiles around your own mark.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(integrationSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"IntegrationSection: cards in up to three columns, or a cluster of linked logo tiles above the header.",
			default: "grid",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "featured",
			type: "boolean",
			description:
				"IntegrationSectionItem: a tinted card in grid, a larger raised tile in cluster.",
			default: "false",
			control: { kind: "none" },
		},
		{
			name: "href",
			type: "string",
			description:
				"IntegrationSectionItemLink (required); give it an aria-label naming the tool, since every link reads the same.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"IntegrationSection: IntegrationSectionHeader, then IntegrationSectionList of items (logo, name, description, link).",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Tiles and arrows hold still; hover colours stay.",
		behaviour: [
			"Cards tint on hover and the link's arrow nudges forward.",
			"Cluster tiles lift with a deeper shadow on hover.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2; items are a list of h3 names.",
			"In the cluster the name stays for screen readers and the whole tile is the link, with a focus ring.",
			"Logos are decorative; the name carries the meaning.",
		],
	},
	guidance: {
		when: ["Showing what a product connects to, on a landing or integrations page."],
		whenNot: [
			{ text: "Customer logos that build trust.", use: "logo-carousel" },
			{ text: "Product features with icons.", use: "feature-section" },
		],
		responsive: [
			"Grid shows one column, two from 36rem and three from 56rem.",
			"The cluster keeps three tiles a row at every width.",
		],
		performance: ["Static markup; logos load as plain images."],
		ai: [
			"Six to nine items; mark only your own product as featured.",
			"In cluster, use an odd count so the featured tile can sit in the middle.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "IntegrationSection" },
		svelte: { entry: "IntegrationSection" },
	},
	keywords: ["integrations", "apps", "logos", "connect", "marketplace", "section"],
});
