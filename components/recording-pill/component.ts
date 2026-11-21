import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { recordingPill as recordingPillVariants } from "./variants";

const VARIANTS = ["inverted", "default", "glass"];
const STATES = ["starting", "listening", "working", "notice"];

export const recordingPill = defineComponent({
	slug: "recording-pill",
	name: "Recording Pill",
	description:
		"Compact chip for a voice session: mic icon, state label, level meter, timer and cancel.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(recordingPillVariants, ["variant", "state"]),
	props: [
		{
			name: "state",
			type: STATES.map((value) => `"${value}"`).join(" | "),
			description:
				"`starting` while the mic arms, `listening` with a live meter, `working` while transcribing or polishing, `notice` for an error.",
			default: "listening",
			control: { kind: "select", options: STATES },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"Inverted page colours so it reads over any app, a plain card, or frosted glass that lets the page show through.",
			default: "inverted",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "level",
			type: "number",
			description:
				"Loudness from 0 to 1, from your audio engine. Moves the meter while listening.",
			default: "0",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The arming and working pulses stop; the meter still follows the level.",
		behaviour: [
			"The meter eases its width to the latest level in 150ms.",
			"The mic icon pulses while the microphone arms; the bar pulses while working.",
		],
	},
	a11y: {
		notes: [
			"A polite status region, so the state change is announced without moving focus.",
			"The meter is decorative; the label and timer carry the information.",
			"Cancel renders only when a handler is passed.",
		],
	},
	guidance: {
		when: [
			"A floating or inline indicator for dictation, voice notes and meeting capture.",
		],
		whenNot: [{ text: "The presence of a voice agent itself.", use: "voice-orb" }],
		responsive: ["The label truncates; the meter and timer keep their size."],
		performance: [
			"Pure render of its props; throttle `level` to about 20 updates a second.",
		],
		ai: ["Own the clock and the level in your app; pass seconds to RecordingPillTimer."],
	},
	impl: {
		react: { entry: "RecordingPill" },
		svelte: { entry: "RecordingPill" },
	},
	keywords: ["recording", "dictation", "microphone", "meter", "timer", "voice"],
});
