import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { liveTranscript as liveTranscriptVariants } from "./variants";

const VARIANTS = ["card", "plain"];

export const liveTranscript = defineComponent({
	slug: "live-transcript",
	name: "Live Transcript",
	description:
		"Text that is still arriving: settled words and the engine's dimmer guess, pinned to the newest line.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(liveTranscriptVariants, ["variant", "tone"]),
	props: [
		{
			name: "committed",
			type: "string",
			description: "Words the engine has settled on.",
			required: true,
			control: { kind: "text" },
		},
		{
			name: "tentative",
			type: "string",
			description: "The engine's current guess, shown dimmer until it settles.",
			default: "",
			control: { kind: "text" },
		},
		{
			name: "session",
			type: "string | number",
			description: "A new value starts a fresh transcript pinned to the newest line.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "A card surface, or none for use inside another surface.",
			default: "card",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The working dot stops pulsing; tentative words still change colour as they settle.",
		behaviour: [
			"The body follows the newest line while pinned and stops following once the reader scrolls up.",
			"Tentative words ease from dim to full contrast as they move into committed.",
		],
	},
	a11y: {
		notes: [
			"The body is a polite live region, so new text is announced without taking focus.",
			"A destructive notice uses role alert; the others use status.",
		],
	},
	guidance: {
		when: ["Streaming speech-to-text, dictation overlays and live captions."],
		whenNot: [{ text: "A finished transcript with actions.", use: "transcript-row" }],
		responsive: ["The body is capped at 10rem and scrolls; older lines fade at the top."],
		performance: [
			"Pure render; pass the latest strings and let the engine own the cadence.",
		],
		ai: [
			"Give committed and tentative from your engine. Show LiveTranscriptStatus while transcribing or polishing.",
		],
	},
	impl: {
		react: { entry: "LiveTranscript" },
		svelte: { entry: "LiveTranscript" },
	},
	keywords: ["transcript", "captions", "streaming", "speech", "dictation", "live"],
});
