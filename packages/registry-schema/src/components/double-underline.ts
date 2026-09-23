import { defineComponent } from "../index";

const TRIGGERS = ["hover", "always"];

export const doubleUnderline = defineComponent({
	slug: "double-underline",
	name: "Double Underline",
	description: "A soft baseline stroke and a second stroke that lifts in above it.",
	category: "text",
	status: "stable",
	variants: { trigger: TRIGGERS },
	props: [
		{
			name: "children",
			type: "ReactNode",
			description: "The text to underline.",
			control: { kind: "none" },
		},
		{
			name: "as",
			type: "ElementType",
			description: "Tag to render. Defaults to `span`.",
			default: "span",
			control: { kind: "none" },
		},
		{
			name: "trigger",
			type: TRIGGERS.map((v) => `"${v}"`).join(" | "),
			description:
				"`hover` reveals the second stroke on hover/focus; `always` keeps both on.",
			default: "hover",
			control: { kind: "select", options: TRIGGERS },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the stroke reveal and letter-spacing shift take, in ms.",
			default: 500,
			control: { kind: "number", min: 100, max: 1500, step: 50 },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The strokes still change, just without the 500ms ease.",
		behaviour: [
			"On `hover`, the top stroke lifts from just below the baseline into place above the glyphs while the bottom stroke fades to half-opacity.",
		],
	},
	a11y: {
		notes: ["Both strokes are `aria-hidden`; the text itself carries the real content."],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) Animata",
	},
	impl: {
		react: {
			entry: "DoubleUnderline",
			files: [
				{ path: "double-underline/double-underline.tsx", type: "registry:ui" },
				{ path: "double-underline/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "DoubleUnderline",
			files: [
				{ path: "double-underline/double-underline.svelte", type: "registry:ui" },
				{ path: "double-underline/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "underline", "hover", "link"],
});
