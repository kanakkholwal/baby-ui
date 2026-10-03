import { defineComponent } from "../index.ts";

const MODES = ["light", "dark"];
const TONES = ["neutral", "chart", "primary"];
const VARIANTS = ["default", "pass", "editorial"];

export const ogAuthorProfile = defineComponent({
	slug: "og-author-profile",
	name: "OG Author Profile",
	description:
		"A 1200x630 author card: an avatar panel with a stat row, a tilted boarding pass, or a staggered editorial bio.",
	category: "og-images",
	status: "stable",
	demo: { mode: "auto", frame: "og" },
	variants: { variant: VARIANTS, mode: MODES, tone: TONES },
	props: [
		{
			name: "name",
			type: "string",
			description: "Author name; clamps to two lines (one on the pass).",
			required: true,
			control: { kind: "text", placeholder: "Name" },
		},
		{
			name: "role",
			type: "string",
			description: "Role under the name; the tone-coloured second line on the pass.",
			control: { kind: "text", placeholder: "Role" },
			showWhen: { variant: ["default", "pass"] },
		},
		{
			name: "bio",
			type: "string",
			description:
				"Bio; clamps to two lines. In `editorial` each line break starts a staggered line.",
			control: { kind: "text", placeholder: "Bio" },
		},
		{
			name: "handle",
			type: "string",
			description:
				"Handle in a pill, top right (leading @ dropped); the motto beside the site on the pass.",
			control: { kind: "text", placeholder: "@handle" },
			showWhen: { variant: ["default", "pass"] },
		},
		{
			name: "site",
			type: "string",
			description: "Site or publication name, top left.",
			control: { kind: "text", placeholder: "Site" },
			showWhen: { variant: ["default", "pass"] },
		},
		{
			name: "label",
			type: "string",
			description: 'Caption over the name, e.g. "Author", or "Passenger" on the pass.',
			control: { kind: "text", placeholder: "Label" },
			showWhen: { variant: ["default", "pass"] },
		},
		{
			name: "avatar",
			type: "string",
			description:
				"Avatar image URL; initials from the name when absent. The emblem beside the site on the pass.",
			control: { kind: "none" },
		},
		{
			name: "stats",
			type: "{ value: string; label: string }[]",
			description:
				"Up to three pre-formatted stats along the bottom; the flight fields on the pass.",
			control: { kind: "none" },
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description:
				"Light or dark card, independent of the page theme. Defaults to light.",
			control: { kind: "select", options: MODES },
		},
		{
			name: "tone",
			type: TONES.map((v) => `"${v}"`).join(" | "),
			description:
				"Accent: role and handle icon, the pass stripes and labels, the editorial circle. Defaults to neutral.",
			control: { kind: "select", options: TONES },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "Avatar panel card, tilted boarding pass, or staggered editorial bio.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "A static image; nothing moves.",
		behaviour: [
			"Fixed 1200x630 canvas built only from flex layout and theme tokens, so takumi renders it the same as the browser.",
			"`mode` scopes the dark tokens to the card itself, so a dark card renders from a light page and vice versa.",
			"The pass tilts with a 2D rotate (the renderer has no 3D transforms) and sets its type in JetBrains Mono.",
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
