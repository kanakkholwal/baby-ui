import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { teamSection as teamSectionVariants } from "./variants";

const VARIANTS = ["grid", "cards", "list"];

export const teamSection = defineComponent({
	slug: "team-section",
	name: "Team Section",
	description:
		"The people behind a product as round faces in a ruled grid, portrait cards, or rows with links, grouped by team if you like.",
	category: "blocks",
	status: "experimental",
	variants: variantsOf(teamSectionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"TeamSection: round faces in a ruled grid, 4:5 portrait cards, or ruled rows with links at the end.",
			default: "grid",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "name",
			type: "string",
			description:
				"TeamSectionMemberAvatar (required): the image's alt text and the fallback initials.",
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description: "TeamSectionMemberLink (required): the link's accessible name.",
			control: { kind: "none" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"TeamSection: TeamSectionHeader, then TeamSectionList (or TeamSectionGroups, each a TeamSectionGroupTitle over a list) of TeamSectionMembers.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"Faces and portraits hold still; the hover colour change on links stays.",
		behaviour: [
			"Grid faces lift and list faces grow a little on hover.",
			"Card portraits warm to full colour and ease in on hover.",
			"Link buttons press in when clicked.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"A section labelled by its h2; group titles are h3s.",
			"Each member is a list item; link buttons carry their own label, icons are hidden.",
		],
	},
	guidance: {
		when: ["An about or careers page introducing the team."],
		whenNot: [{ text: "Quotes from customers.", use: "testimonial" }],
		responsive: [
			"Grid shows two faces a row, then three from 36rem and four from 48rem.",
			"List moves links to the end of each row from 36rem.",
		],
		performance: ["Avatars fade in as they load; initials show until then."],
		ai: [
			"Group by department only past eight people.",
			"Keep roles to a few words and bios to one sentence.",
		],
	},
	licenseOrigin: {
		source: "cnblocks",
		url: "https://sv-blocks.vercel.app",
		license: "MIT",
		copyright: "Copyright (c) 2026 Sikandar Bhide",
	},
	impl: {
		react: { entry: "TeamSection" },
		svelte: { entry: "TeamSection" },
	},
	keywords: ["team", "people", "about", "staff", "members", "careers"],
});
