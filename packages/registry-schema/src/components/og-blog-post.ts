import { defineComponent } from "../index";

const MODES = ["light", "dark"];
const TONES = ["chart", "primary", "neutral"];

export const ogBlogPost = defineComponent({
	slug: "og-blog-post",
	name: "OG Blog Post",
	description:
		"A 1200x630 blog post card: publication, category, title, excerpt and a byline, rendered to PNG with takumi.",
	category: "og-images",
	status: "stable",
	demo: { mode: "auto", frame: "og" },
	variants: { mode: MODES, tone: TONES },
	props: [
		{
			name: "title",
			type: "string",
			description: "Post title; clamps to three lines.",
			required: true,
			default: "Designing motion that respects the reader",
			control: { kind: "text" },
		},
		{
			name: "site",
			type: "string",
			description: "Publication name, top left.",
			required: true,
			default: "baby ui",
			control: { kind: "text" },
		},
		{
			name: "excerpt",
			type: "string",
			description: "One or two lines under the title; clamps to two.",
			default:
				"Exits mirror entrances, springs settle fast, and reduced motion gets its own path.",
			control: { kind: "text" },
		},
		{
			name: "category",
			type: "string",
			description: "Pill, top right.",
			default: "Engineering",
			control: { kind: "text" },
		},
		{
			name: "author",
			type: "{ name: string; avatar?: string }",
			description: "Byline; the avatar is an image URL.",
			control: { kind: "none" },
		},
		{
			name: "date",
			type: "string",
			description: "Pre-formatted date, so the card never guesses a locale.",
			control: { kind: "none" },
		},
		{
			name: "readingTime",
			type: "string",
			description: 'Pre-formatted, e.g. "6 min read".',
			control: { kind: "none" },
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
			description: "Colour of the corner glow.",
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
			"Rendered to an image: give the meta tag a matching og:image:alt, usually the title.",
		],
	},
	impl: {
		react: {
			entry: "OgBlogPost",
			files: [
				{ path: "og-blog-post/og-blog-post.tsx", type: "registry:ui" },
				{ path: "og-blog-post/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "OgBlogPost",
			files: [
				{ path: "og-blog-post/og-blog-post.svelte", type: "registry:ui" },
				{ path: "og-blog-post/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["og", "open graph", "social card", "blog", "takumi", "image"],
});
