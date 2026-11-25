import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { audioComposer as audioComposerVariants } from "./variants";

const VARIANTS = ["docked", "inline"];

export const audioComposer = defineComponent({
	slug: "audio-composer",
	name: "Audio Composer",
	description:
		"Prompt box for generating audio, with a length stepper, a style choice and a submit that becomes stop.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(audioComposerVariants, ["variant"]),
	props: [
		{
			name: "presets",
			type: "string[]",
			description: "The style choices, such as Cinematic or Lo-fi.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "preset",
			type: "string",
			description:
				"The chosen style. Controlled, or `defaultPreset` to let it drive itself; starts at the first.",
			control: { kind: "none" },
		},
		{
			name: "duration",
			type: "number",
			description:
				"Length in seconds. Controlled, or `defaultDuration` to let it drive itself.",
			default: "10",
			control: { kind: "none" },
		},
		{
			name: "min",
			type: "number",
			description: "Shortest length in seconds.",
			default: "2",
			control: { kind: "number", min: 1, max: 30, step: 1 },
		},
		{
			name: "max",
			type: "number",
			description: "Longest length in seconds.",
			default: "60",
			control: { kind: "number", min: 10, max: 300, step: 5 },
		},
		{
			name: "step",
			type: "number",
			description: "Seconds each press of Shorter or Longer.",
			default: "2",
			control: { kind: "number", min: 1, max: 10, step: 1 },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "A card that docks at the bottom of a page, or no surface of its own.",
			default: "docked",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "loading",
			type: "boolean",
			description:
				"A clip is being made: the length and style lock and send becomes stop.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onSubmit",
			type: "(prompt: string, options: { duration: number; preset: string }) => void",
			description: "Called with the trimmed prompt, the length in seconds and the style.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The send and stop icons change without sliding.",
		behaviour: [
			"The send icon swaps to stop with a short rise.",
			"The length buttons press in; the value updates as you step.",
		],
	},
	a11y: {
		notes: [
			"The stepper is a group named Length. The value is a polite live region.",
			"Shorter and Longer disable at the limits.",
			"While loading, the length and style lock.",
			"The style is a select with full keyboard support.",
			"Enter sends, Shift+Enter adds a line, as in Composer.",
		],
	},
	guidance: {
		when: [
			"Text-to-audio and text-to-music prompts where length and style are part of the request.",
		],
		whenNot: [{ text: "A plain chat box.", use: "composer" }],
		responsive: ["The style select truncates; the toolbar keeps one line."],
		performance: ["No effects of its own; Composer owns the input."],
		ai: [
			"Compose ComposerInput and ComposerToolbar with AudioComposerDuration, AudioComposerStyle and AudioComposerTools (ending in ComposerSubmit).",
		],
	},
	impl: {
		react: { entry: "AudioComposer" },
		svelte: { entry: "AudioComposer" },
	},
	keywords: ["audio", "music", "prompt", "generate", "duration", "composer"],
});
