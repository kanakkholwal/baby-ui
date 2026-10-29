import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { heroSection as heroSectionVariants } from "./variants";

const VARIANTS = ["centered", "split"];
const MEDIA = ["plain", "framed", "tilted"];

export const heroSection = defineComponent({
	slug: "hero-section",
	name: "Hero Section",
	description:
		"A landing hero with an announcement pill, headline, actions and customer logos, over or beside a framed or tilted product shot.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(heroSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "HeroSection: copy centred over the media, or beside it from 56rem.",
			default: "centered",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "media",
			type: MEDIA.map((v) => `"${v}"`).join(" | "),
			description:
				"HeroSectionMedia `variant`: as is, in a rim that fades out, or skewed over a plate.",
			default: "framed",
			control: { kind: "select", options: MEDIA },
		},
		{
			name: "href",
			type: "string",
			description:
				"HeroSectionAnnouncement (required) and HeroSectionAction; an action without it is a button with onClick.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description:
				'HeroSectionAnnouncement: a lead like "New"; HeroSectionLogos: the line above the logos.',
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"HeroSection: HeroSectionContent (announcement, title, description, actions, logos), then HeroSectionMedia.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Parts appear without rising; the pill arrow and tilt stay still.",
		behaviour: [
			"Announcement, title, description, actions, logos and media rise in on a short stagger.",
			"The pill's arrow slides out as a second one slides in on hover.",
			"Hovering a logo dims the others; the tilted shot eases toward flat on hover.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its title, the page's h1.",
			"The announcement is a real link; its arrows are hidden from screen readers.",
			"Give each logo image the company name as alt text.",
		],
	},
	guidance: {
		when: ["The top of a landing or product page."],
		whenNot: [
			{ text: "A hero over an animated glow.", use: "gradient-hero-01" },
			{ text: "A closing call to action.", use: "cta-section" },
		],
		responsive: [
			"Actions stack full width under 36rem; split stacks under 56rem.",
			"Sizes follow the section's own width (container queries), not the viewport.",
		],
		performance: ["No observers or JS motion; the entrance and hovers are CSS."],
		ai: [
			"One primary HeroSectionAction, at most one ghost or outline secondary.",
			"Keep the title under ten words and the description under two lines.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "HeroSection" },
		svelte: { entry: "HeroSection" },
	},
	keywords: ["hero", "landing", "header", "marketing", "announcement", "screenshot"],
});
