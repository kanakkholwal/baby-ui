import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { contactSection as contactSectionVariants } from "./variants";

const VARIANTS = ["split", "stacked"];

export const contactSection = defineComponent({
	slug: "contact-section",
	name: "Contact Section",
	description:
		"A contact page section: ways to reach you, each a title, link and detail, beside or above a form card that holds your own fields.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(contactSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"ContactSection: copy and channels beside the form from 56rem, or centred with ruled channel cells over a narrower form.",
			default: "split",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "href",
			type: "string",
			description: "ContactSectionChannelLink (required): a mailto:, tel: or page URL.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"ContactSection: ContactSectionHeader, ContactSectionChannels of ContactSectionChannel, then ContactSectionForm with your fields and submit button.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Link underlines appear without drawing in.",
		behaviour: ["A channel link's underline draws in from the left on hover."],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2; the form is labelled by ContactSectionFormTitle.",
			"Channels are a list of h3 headings with real links.",
			"The form is yours: label every field and announce the result in a status region.",
		],
	},
	guidance: {
		when: ["A contact, sales or support page."],
		whenNot: [
			{ text: "A one-field email capture.", use: "newsletter-signup" },
			{ text: "Sign in or sign up.", use: "auth-form" },
		],
		responsive: [
			"Split stacks the form under the channels below 56rem.",
			"Stacked channel cells wrap at 14rem each.",
		],
		performance: ["No JS of its own; the form is a plain <form> you handle."],
		ai: [
			"Two to four channels, each with one link.",
			"Ask only for what you need: name, email and a message is enough.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "ContactSection" },
		svelte: { entry: "ContactSection" },
	},
	keywords: ["contact", "form", "support", "sales", "email", "section"],
});
