import { defineComponent } from "../index";

const DIRECTIONS = ["left", "center"];

export const metisText = defineComponent({
	slug: "metis-text",
	name: "Metis Text",
	description: "Hover draws an underline in; on exit it retracts back out.",
	category: "text",
	status: "stable",
	variants: { direction: DIRECTIONS },
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
			name: "direction",
			type: DIRECTIONS.map((v) => `"${v}"`).join(" | "),
			description: "Which edge the underline grows from.",
			default: "left",
			control: { kind: "select", options: DIRECTIONS },
		},
		{
			name: "durationMs",
			type: "number",
			description: "How long the underline grows for, in ms.",
			default: 300,
			control: { kind: "number", min: 100, max: 1000, step: 50 },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The underline still appears/disappears, just without the 300ms scale.",
		behaviour: [
			"A `scale-x` transform grows the underline in on hover/focus and shrinks it back out on exit.",
		],
	},
	a11y: {
		keyboard: [
			"Focusable (`tabindex=0`); the underline responds to focus the same as hover.",
		],
		notes: ["The underline is a decorative `aria-hidden` element."],
	},
	licenseOrigin: {
		source: "animata",
		url: "https://animata.design",
		license: "MIT",
		copyright: "Copyright (c) Animata",
	},
	impl: {
		react: {
			entry: "MetisText",
			files: [
				{ path: "metis-text/metis-text.tsx", type: "registry:ui" },
				{ path: "metis-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "MetisText",
			files: [
				{ path: "metis-text/metis-text.svelte", type: "registry:ui" },
				{ path: "metis-text/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "underline", "hover", "link"],
});
