import { defineComponent } from "../index";

const MODES = ["light", "dark"];
const TONES = ["chart", "primary", "neutral"];

export const ogAuthorProfile = defineComponent({
	slug: "og-author-profile",
	name: "OG Author Profile",
	description:
		"A 1200x630 author card: large avatar on a tone panel, name, role, bio, handle and a stat row, rendered to PNG with takumi.",
	category: "og-images",
	status: "stable",
	demo: { mode: "auto", frame: "og" },
	variants: { mode: MODES, tone: TONES },
	props: [
		{
			name: "name",
			type: "string",
			description: "Author name; clamps to two lines.",
			required: true,
			default: "Ada Park",
			control: { kind: "text" },
		},
		{
			name: "role",
			type: "string",
			description: "Role or title under the name.",
			default: "Staff Engineer at Acme",
			control: { kind: "text" },
		},
		{
			name: "bio",
			type: "string",
			description: "One or two lines of bio; clamps to two.",
			default:
				"Writes about design systems, motion and the craft of shipping small, sharp tools.",
			control: { kind: "text" },
		},
		{
			name: "handle",
			type: "string",
			description:
				"Social handle in a pill, top right; a leading @ is dropped since the icon draws one.",
			default: "@adapark",
			control: { kind: "text" },
		},
		{
			name: "site",
			type: "string",
			description: "Site or publication name, top left.",
			default: "baby ui",
			control: { kind: "text" },
		},
		{
			name: "avatar",
			type: "string",
			description: "Avatar image URL; initials from the name when absent.",
			control: { kind: "none" },
		},
		{
			name: "stats",
			type: "{ value: string; label: string }[]",
			description: "Up to three pre-formatted stats along the bottom.",
			control: { kind: "none" },
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description: "Light or dark card, independent of the page theme.",
			default: "light",
			control: { kind: "select", options: MODES },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description: "Colour of the avatar panel and accents.",
			default: "chart",
			control: { kind: "select", options: TONES },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "A static image; nothing moves.",
		behaviour: [
			"Fixed 1200x630 canvas built only from flex layout and theme tokens, so takumi renders it the same as the browser.",
			"`mode` scopes the dark tokens to the card itself, so a dark card renders from a light page and vice versa.",
		],
	},
	a11y: {
		keyboard: [],
		notes: [
			"Rendered to an image: give the meta tag a matching og:image:alt, usually the author name and role.",
		],
	},
	impl: {
		react: {
			entry: "OgAuthorProfile",
			files: [
				{ path: "og-author-profile/og-author-profile.tsx", type: "registry:ui" },
				{ path: "og-author-profile/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "OgAuthorProfile",
			files: [
				{ path: "og-author-profile/og-author-profile.svelte", type: "registry:ui" },
				{ path: "og-author-profile/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["og", "open graph", "social card", "author", "profile", "takumi", "image"],
});
