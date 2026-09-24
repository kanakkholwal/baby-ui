import { defineComponent } from "../index";

const SIZES = ["inherit", "sm", "md", "lg"];

export const textInertia = defineComponent({
	slug: "text-inertia",
	name: "Text Inertia",
	description:
		"Words get knocked along by the pointer's momentum and spring back into line.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The line to split into words.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "intensity",
			type: "number",
			description: "Scales how far words fly from the pointer's speed.",
			default: 1,
			control: { kind: "number", min: 0.25, max: 3, step: 0.25 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale; inherit takes the surrounding text size.",
			default: "inherit",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "wordClassName",
			type: "string",
			description: "Classes on each word. wordClass in Svelte.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Words stay put.",
		behaviour: [
			"Entering a word kicks it along the pointer's velocity, capped at 46px and 18deg, or a small alternating nudge when the pointer is still.",
			"The word follows a sampled 58/16/1.35 spring pulled toward the kick for 150ms, peaking at 37% of it after 240ms and settling by 1190ms.",
		],
	},
	a11y: {
		notes: ["The full line is in an sr-only span; the moving words are hidden."],
	},
	licenseOrigin: {
		source: "iconiq",
		url: "https://iconiqui.com",
		license: "MIT",
		copyright: "Copyright (c) 2024-2026 Edwin Vakayil",
	},
	impl: {
		react: {
			entry: "TextInertia",
			files: [
				{ path: "text-inertia/text-inertia.tsx", type: "registry:ui" },
				{ path: "text-inertia/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TextInertia",
			files: [
				{ path: "text-inertia/text-inertia.svelte", type: "registry:ui" },
				{ path: "text-inertia/text-inertia-word.svelte", type: "registry:ui" },
				{ path: "text-inertia/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["inertia", "pointer", "spring", "momentum", "hover", "words"],
});
