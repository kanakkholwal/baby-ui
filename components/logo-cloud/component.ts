import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { logoCloud as logoCloudVariants } from "./variants";

const VARIANTS = ["grid", "row"];

export const logoCloud = defineComponent({
	slug: "logo-cloud",
	name: "Logo Cloud",
	description:
		"Customer logos as a centred grid or a ruled row; hovering blurs them and surfaces a link to every customer story.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(logoCloudVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"LogoCloud: a centred grid, three then four a row, or a ruled band with the title beside the logos from 56rem.",
			default: "grid",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "href",
			type: "string",
			description:
				"LogoCloudLink (required): optional part; without it the logos never blur.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"LogoCloud: LogoCloudTitle, then LogoCloudContent with a LogoCloudList of LogoCloudItem and an optional LogoCloudLink.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Logos dim without blurring motion; the link appears without scaling.",
		behaviour: [
			"With a mouse, hovering or focusing the logos blurs and dims them while the link scales up into view over them.",
			"On touch there is no hover, so the link sits under the logos instead.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Give each logo the company name as alt text; the title is an h2.",
			"The link is always in the tab order; focusing it reveals it.",
		],
	},
	guidance: {
		when: ["Social proof under a hero or above pricing."],
		whenNot: [
			{ text: "Logos that move or cycle.", use: "logo-carousel" },
			{ text: "Tools your product connects to.", use: "integration-section" },
		],
		responsive: ["Grid shows three logos a row, four from 36rem; row wraps until 56rem."],
		performance: ["Plain images; every effect is CSS."],
		ai: ["Six or eight logos, all one colour, at the same height."],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "LogoCloud" },
		svelte: { entry: "LogoCloud" },
	},
	keywords: ["logos", "customers", "trusted by", "social proof", "brands"],
});
