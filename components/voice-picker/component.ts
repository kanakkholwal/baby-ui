import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { voicePicker as voicePickerVariants } from "./variants";

const VARIANTS = ["stack", "inline"];
const SAMPLES = ["idle", "making", "playing"];

export const voicePicker = defineComponent({
	slug: "voice-picker",
	name: "Voice Picker",
	description:
		"Choose a voice, hear it and set the speed. Every voice gets its own gradient swatch, and the sample button shows what it is doing.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(voicePickerVariants, ["variant", "sample"]),
	props: [
		{
			name: "voices",
			type: "{ id: string; name: string; detail?: string }[]",
			description: "The voices to choose from. Detail is the accent, gender or style.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "string",
			description:
				"The chosen voice id. Controlled, or `defaultValue` to let it drive itself.",
			control: { kind: "none" },
		},
		{
			name: "speed",
			type: "number",
			description:
				"Speaking speed. Controlled, or `defaultSpeed` to let it drive itself.",
			default: "1",
			control: { kind: "none" },
		},
		{
			name: "sample",
			type: SAMPLES.map((value) => `"${value}"`).join(" | "),
			description:
				"`making` while the sample is prepared, `playing` while it is heard; the button spins, then shows a live equaliser and turns into stop.",
			default: "idle",
			control: { kind: "select", options: SAMPLES },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"Each control on its own line with a speed slider, or voice, sample and speed in one bar where speed is a button that cycles.",
			default: "stack",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The equaliser holds still; the sample button still changes label.",
		behaviour: [
			"The equaliser bars pulse out of step while a sample plays.",
			"The sample button spins while the sample is made, then swaps to stop.",
		],
	},
	a11y: {
		notes: [
			"The voice list is a select with full keyboard support; the swatch is decorative and the name is always written.",
			'The speed slider is named "Speaking speed" and shows its value as text.',
			"Sample is disabled unless its handler is passed.",
		],
	},
	guidance: {
		when: [
			"Settings and read-aloud panels where the voice, a preview and the speed belong together.",
		],
		whenNot: [{ text: "Playback controls for text being read.", use: "speech-player" }],
		responsive: ["`inline` wraps its controls onto a second line on narrow widths."],
		performance: ["Pure render; swatches are computed from the voice id, no assets."],
		ai: [
			"Report `sample` from your audio engine and apply speed changes from the next sentence.",
		],
	},
	impl: {
		react: { entry: "VoicePicker" },
		svelte: { entry: "VoicePicker" },
	},
	keywords: ["voice", "tts", "speech", "picker", "sample", "speed"],
});
