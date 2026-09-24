import { defineComponent } from "../index";

const SIZES = ["sm", "md", "lg"];
const MODES = ["loop", "hover"];

export const textExplodeIMessage = defineComponent({
	slug: "text-explode-imessage",
	name: "Text Explode (iMessage)",
	description:
		"A shrink, jitter, then explode-outward cycle, iMessage-invisible-ink style.",
	category: "text",
	status: "stable",
	variants: { size: SIZES },
	props: [
		{
			name: "text",
			type: "string",
			description: "The text to explode.",
			control: { kind: "text" },
			default: "Big news",
		},
		{
			name: "mode",
			type: MODES.map((v) => `"${v}"`).join(" | "),
			description: "Plays continuously, or once per hover/tap.",
			default: "loop",
			control: { kind: "select", options: MODES },
		},
		{
			name: "durationMs",
			type: "number",
			description: "Full shrink-jitter-explode-reset cycle length.",
			default: 4000,
			control: { kind: "number", min: 1500, max: 8000, step: 250 },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "Type scale.",
			default: "lg",
			control: { kind: "select", options: SIZES },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Characters stay put at full opacity; the cycle is skipped entirely.",
		behaviour: [
			"One shared keyframe timeline (shrink, jitter, explode outward, reset) runs per character, each with its own random outward direction, rotation and scale baked in once as CSS custom properties when `text` changes.",
			"`loop` mode plays every character's cycle continuously and independently; `hover` mode plays one full cycle per hover or tap, ignoring re-triggers mid-play.",
			"The random per-character vectors are fixed for the life of a given `text`, not re-rolled on every loop iteration.",
		],
	},
	a11y: {
		notes: [
			"A single `sr-only` copy carries the real text; the animated characters are visual only.",
		],
	},

	impl: {
		react: {
			entry: "TextExplodeIMessage",
			files: [
				{ path: "text-explode-imessage/text-explode-imessage.tsx", type: "registry:ui" },
				{ path: "text-explode-imessage/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
		svelte: {
			entry: "TextExplodeIMessage",
			files: [
				{
					path: "text-explode-imessage/text-explode-imessage.svelte",
					type: "registry:ui",
				},
				{ path: "text-explode-imessage/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
		},
	},
	keywords: ["text", "explode", "imessage", "invisible-ink", "animated"],
});
