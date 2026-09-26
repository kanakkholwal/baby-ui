import { defineComponent } from "../index";

const MODES = ["light", "dark"];
const TONES = ["chart", "primary", "neutral"];

export const ogNewsletterIssue = defineComponent({
	slug: "og-newsletter-issue",
	name: "OG Newsletter Issue",
	description:
		"A 1200x630 editorial newsletter cover: small publication name, one huge headline and an optional also-inside line, rendered to PNG with takumi.",
	category: "og-images",
	status: "stable",
	variants: { mode: MODES, tone: TONES },
	props: [
		{
			name: "publication",
			type: "string",
			description: "Newsletter name, set small at the top.",
			required: true,
			default: "The Render Loop",
			control: { kind: "text" },
		},
		{
			name: "headline",
			type: "string",
			description: "Lead story headline, the focal point; clamps to three lines.",
			required: true,
			default: "Why every design system eventually rebuilds its tokens",
			control: { kind: "text" },
		},
		{
			name: "issue",
			type: "string",
			description: 'Pre-formatted issue label, e.g. "No. 42".',
			default: "No. 42",
			control: { kind: "text" },
		},
		{
			name: "date",
			type: "string",
			description: "Pre-formatted date, so the card never guesses a locale.",
			default: "Sep 26, 2026",
			control: { kind: "text" },
		},
		{
			name: "inside",
			type: "string",
			description: "One also-inside headline at the bottom; clamps to one line.",
			default: "Springs that settle in under 300ms",
			control: { kind: "text" },
		},
		{
			name: "insideLabel",
			type: "string",
			description: "Label before the also-inside headline.",
			default: "Also inside",
			control: { kind: "text" },
		},
		{
			name: "logo",
			type: "string",
			description: "Publication logo URL beside the name.",
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
			description:
				"`chart` and `primary` tint the whole field; `neutral` stays plain. Also colours the issue line.",
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
			"Rendered to an image: give the meta tag a matching og:image:alt, usually the lead headline.",
		],
	},
	impl: {
		react: {
			entry: "OgNewsletterIssue",
			files: [
				{ path: "og-newsletter-issue/og-newsletter-issue.tsx", type: "registry:ui" },
				{ path: "og-newsletter-issue/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "OgNewsletterIssue",
			files: [
				{ path: "og-newsletter-issue/og-newsletter-issue.svelte", type: "registry:ui" },
				{ path: "og-newsletter-issue/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["og", "open graph", "social card", "newsletter", "email", "takumi", "image"],
});
