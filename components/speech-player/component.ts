import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { speechPlayer as speechPlayerVariants } from "./variants";

const VARIANTS = ["card", "inline"];
const STATES = ["idle", "preparing", "playing", "paused"];

export const speechPlayer = defineComponent({
	slug: "speech-player",
	name: "Speech Player",
	description:
		"Read-aloud controls: play or pause, skip by passage, speed, and progress by chunk for long text.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(speechPlayerVariants, ["variant", "state"]),
	props: [
		{
			name: "state",
			type: STATES.map((value) => `"${value}"`).join(" | "),
			description:
				"`preparing` shows a spinner and an indeterminate bar while the voice starts; `playing` and `paused` swap the play button.",
			default: "idle",
			control: { kind: "select", options: STATES },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "A card surface, or none for use inside a message or toolbar.",
			default: "card",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "at",
			type: "number",
			description: "The chunk being read, 1 to `count`; 0 before it starts.",
			required: true,
			control: { kind: "number", min: 0, max: 8, step: 1 },
		},
		{
			name: "count",
			type: "number",
			description: "How many chunks the text was split into.",
			required: true,
			control: { kind: "number", min: 1, max: 8, step: 1 },
		},
		{
			name: "rate",
			type: "number",
			description: "Speaking speed. Controlled, or `defaultRate` to let it drive itself.",
			default: "1",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The selected speed pill and the play and pause swap change without sliding.",
		behaviour: [
			"The play button swaps its face with a short crossfade; the speed pill glides between options.",
			"The progress bar fills as `at` advances.",
		],
	},
	a11y: {
		notes: [
			"Buttons are named by action (Read aloud, Pause, Resume, Previous passage, Next passage).",
			"The position text is a polite live region.",
			"Skip, stop and play render disabled or hidden unless the matching handler is passed.",
		],
	},
	guidance: {
		when: [
			"Read-aloud for a reply or document, with the voice running on the device or a server.",
		],
		whenNot: [{ text: "Recording the user's voice.", use: "recording-pill" }],
		responsive: ["The speed group sits to the right and wraps below on narrow widths."],
		performance: ["Pure render of its props; the app owns the audio."],
		ai: [
			"Split the text into chunks, pass at and count, and wire the handlers. Show a VoiceOrb with activity while state is playing.",
		],
	},
	impl: {
		react: { entry: "SpeechPlayer" },
		svelte: { entry: "SpeechPlayer" },
	},
	keywords: ["text to speech", "tts", "read aloud", "player", "speed", "voice"],
});
