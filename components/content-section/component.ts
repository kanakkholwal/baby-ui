import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { contentSection as contentSectionVariants } from "./variants";

const VARIANTS = ["split", "stacked"];

export const contentSection = defineComponent({
	slug: "content-section",
	name: "Content Section",
	description:
		"An editorial section: a title, a few paragraphs with a highlighted line and a pull quote, beside or above a framed image.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(contentSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"ContentSection: media beside the prose from 48rem, or a centred reading column over full-width media.",
			default: "split",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"ContentSection: ContentSectionTitle, ContentSectionMedia, then ContentSectionBody (paragraphs, optional ContentSectionQuote of text and author).",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The image holds still on hover.",
		behaviour: ["The image eases in a touch under the pointer."],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2; the quote is a figure with a figcaption.",
			"Give the image real alt text; it carries part of the story.",
		],
	},
	guidance: {
		when: ["Telling a product story between feature grids, or an about page."],
		whenNot: [
			{ text: "A list of features with icons.", use: "feature-section" },
			{ text: "Many customer quotes.", use: "testimonial-section" },
		],
		responsive: ["Split stacks the media over the prose below 48rem."],
		performance: ["Static markup; one image."],
		ai: [
			"Two short paragraphs; bold one phrase, not a sentence.",
			"At most one pull quote, from a real customer.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "ContentSection" },
		svelte: { entry: "ContentSection" },
	},
	keywords: ["content", "editorial", "story", "about", "quote", "section"],
});
