import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { voiceOrb as voiceOrbVariants } from "./variants";

const VARIANTS = ["ember", "ocean", "mono"];
const SIZES = ["sm", "default", "lg"];

export const voiceOrb = defineComponent({
	slug: "voice-orb",
	name: "Voice Orb",
	description:
		"A grainy liquid sphere for voice agents: its folds open and its outline ripples with the speaker's level, from a number or your audio analyser.",
	category: "agents",
	status: "beta",
	added: "2026-10-31",
	variants: variantsOf(voiceOrbVariants, ["variant", "size"]),
	props: [
		{
			name: "activity",
			type: "number",
			description:
				"Voice level from 0 to 1, e.g. from your speech engine. Ignored while `analyser` is set.",
			default: 0,
			control: { kind: "none" },
		},
		{
			name: "analyser",
			type: "AnalyserNode | null",
			description:
				"Your Web Audio analyser; the orb reads its level each frame and never opens a microphone itself.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description: "The palette: warm `ember`, cool `ocean` or neutral `mono`.",
			default: "ember",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "size",
			type: SIZES.map((v) => `"${v}"`).join(" | "),
			description: "4rem, 10rem or 16rem across.",
			default: "default",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "colors",
			type: "[base: string, light: string, dark: string]",
			description: "Hex colours in place of the variant's palette.",
			control: { kind: "none" },
		},
		{
			name: "active",
			type: "boolean",
			description: "False holds the surface still, e.g. while muted.",
			default: true,
			control: { kind: "boolean" },
		},
		{
			name: "speed",
			type: "number",
			description: "How fast the liquid drifts; 0 stops it between words.",
			default: 1,
			control: { kind: "none" },
		},
		{
			name: "label",
			type: "string",
			description:
				'Names the orb as an image, e.g. "Assistant is speaking"; without it the orb is decorative.',
			control: { kind: "none" },
		},
		{
			name: "onError",
			type: "(error: Error) => void",
			description:
				"Called when WebGL is unavailable or fails; the orb shows a plain fallback.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The surface draws once and holds still; it no longer swells with the voice.",
		behaviour: [
			"The liquid drifts and the outline breathes at rest.",
			"The voice level eases in and out, opening the folds, rippling the rim and lifting the orb a little.",
		],
	},
	a11y: {
		notes: [
			"With a label the orb is an image that names the voice state; without one it is hidden from assistive tech.",
			"Write the state in text beside it too (Listening, Speaking), since the motion alone carries it.",
		],
	},
	guidance: {
		when: ["A voice assistant's presence: listening, thinking and speaking."],
		whenNot: [
			{ text: "A wait with a label and a timer.", use: "loading-state" },
			{ text: "An ambient gradient behind content.", use: "prism-orb" },
		],
		responsive: [
			"The orb is square and sized by `size`; the canvas follows its box at up to 2x density.",
		],
		performance: [
			"One WebGL canvas; it stops drawing offscreen, in a hidden tab, and when still with nothing to settle.",
			"The context is rebuilt after a GPU reset.",
		],
		ai: [
			"Feed `activity` from the TTS or speech level you already have, or pass an `analyser` from the audio graph.",
		],
	},
	licenseOrigin: {
		source: "beui",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},
	// Files, npm and registry dependencies are derived from each port's imports by pnpm gen.
	impl: {
		react: { entry: "VoiceOrb" },
		svelte: { entry: "VoiceOrb" },
	},
	keywords: ["voice", "orb", "audio", "speech", "assistant", "webgl", "visualizer"],
});
