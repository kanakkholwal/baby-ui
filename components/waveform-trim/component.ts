import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { waveformTrim as waveformTrimVariants } from "./variants";

const VARIANTS = ["bars", "mirror"];

export const waveformTrim = defineComponent({
	slug: "waveform-trim",
	name: "Waveform Trim",
	description:
		"A waveform with two draggable trim handles, hatched cut-away audio, a playhead and click to seek.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(waveformTrimVariants, ["variant", "kept"]),
	props: [
		{
			name: "peaks",
			type: "number[]",
			description:
				"Loudness samples from 0 to 1, one per bar. Compute them from your audio.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "range",
			type: "[number, number]",
			description:
				"The kept part as `[start, end]`, each 0 to 1. Controlled, or `defaultRange` to let it drive itself.",
			default: "[0, 1]",
			control: { kind: "none" },
		},
		{
			name: "position",
			type: "number",
			description: "Playhead from 0 to 1. The app owns playback.",
			control: { kind: "none" },
		},
		{
			name: "duration",
			type: "number",
			description: "Length in seconds; turns the times under the track into real m:ss.s.",
			control: { kind: "number", min: 1, max: 600, step: 1 },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "Bars standing on a baseline, or a mirrored wave around the middle.",
			default: "bars",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Handles and bars change without easing.",
		behaviour: [
			"Bars outside the kept range fade and turn muted as a handle passes them.",
			"A handle follows the pointer exactly while dragged and presses in slightly.",
		],
	},
	a11y: {
		notes: [
			"Each handle is a slider named Trim start or Trim end; arrow keys move it by 1%, Shift by 10%.",
			"Cut audio is hatched as well as dimmed, so it never reads as colour alone.",
			"The track is a seek target only when `onSeek` is passed.",
		],
	},
	guidance: {
		when: ["Trimming a recording or a generated clip before saving or exporting it."],
		whenNot: [{ text: "Showing the voice level live.", use: "recording-pill" }],
		responsive: [
			"The track fills its container; one bar per sample, so pass fewer peaks on narrow screens.",
		],
		performance: ["Plain DOM bars; keep peaks under about 200."],
		ai: [
			"Downsample audio to peaks yourself. Keep the range in state and apply it when exporting.",
		],
	},
	impl: {
		react: { entry: "WaveformTrim" },
		svelte: { entry: "WaveformTrim" },
	},
	keywords: ["waveform", "trim", "audio", "cut", "editor", "scrub"],
});
