import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { testimonialSection as testimonialSectionVariants } from "./variants";

const VARIANTS = ["masonry", "bento"];

export const testimonialSection = defineComponent({
	slug: "testimonial-section",
	name: "Testimonial Section",
	description:
		"A wall of customer quotes under a heading: masonry columns that pack any length, or a bento grid with one featured quote.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(testimonialSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"TestimonialSection: packed columns, or a four-column grid where a featured quote spans 2x2.",
			default: "masonry",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "featured",
			type: "boolean",
			description: "TestimonialSectionItem: a larger quote; a 2x2 block in bento.",
			default: "false",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"TestimonialSection: TestimonialSectionHeader, then TestimonialSectionList of TestimonialSectionItem, each holding a Testimonial.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Quotes hold still on hover.",
		behaviour: ["Each quote lifts a little under the pointer."],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2; quotes are a list of figures with their authors.",
			"Masonry reads top to bottom in each column, so order quotes by importance down the first column.",
		],
	},
	guidance: {
		when: ["Social proof on a landing or pricing page, five or more quotes."],
		whenNot: [{ text: "One standalone quote.", use: "testimonial" }],
		responsive: [
			"One column, two from 36rem, three (masonry) or four (bento) from 56rem.",
		],
		performance: ["Pure CSS layout; avatars load as images."],
		ai: [
			"Mark at most one quote featured, and put it first.",
			"Keep quotes to two or three sentences; a featured one can run longer.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "TestimonialSection" },
		svelte: { entry: "TestimonialSection" },
	},
	keywords: ["testimonials", "reviews", "quotes", "social proof", "wall", "section"],
});
