import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { downloadCard as downloadCardVariants } from "./variants";

const VARIANTS = ["default", "compact", "ring"];
const PHASES = ["downloading", "checking"];

export const downloadCard = defineComponent({
	slug: "download-card",
	name: "Download Card",
	description:
		"One card for any download: name, percent, size done of total, speed, time left, a checking state and cancel.",
	category: "advanced",
	status: "alpha",
	variants: variantsOf(downloadCardVariants, ["variant", "phase"]),
	props: [
		{
			name: "downloaded",
			type: "number",
			description: "Bytes received so far.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "total",
			type: "number",
			description:
				"Bytes expected. Zero while unknown, which shows an indeterminate bar.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "bytesPerSecond",
			type: "number",
			description: "Current speed; drives the speed and time-left text.",
			default: "0",
			control: { kind: "none" },
		},
		{
			name: "phase",
			type: PHASES.map((value) => `"${value}"`).join(" | "),
			description:
				"`checking` is the pause after the last byte: a shield icon, an indeterminate bar and no cancel.",
			default: "downloading",
			control: { kind: "select", options: PHASES },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"A card surface, no surface for use inside a card that already names the file, or a card whose icon is a ring that fills as the download progresses.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "The checking icon stops pulsing; the bar still fills.",
		behaviour: [
			"The bar fills as `downloaded` changes; checking swaps to a sweeping bar and a pulsing shield.",
		],
	},
	a11y: {
		notes: [
			"The card is a polite status region, so progress is announced without stealing focus.",
			"The bar takes the file name as its accessible name.",
			"Cancel renders only when a handler is passed.",
		],
	},
	guidance: {
		when: [
			"Model, update or file downloads where people need what, how far, how fast and how long.",
		],
		whenNot: [
			{ text: "A generic progress bar with no sizes or speed.", use: "progress" },
		],
		responsive: ["Titles and stats truncate; nothing wraps."],
		performance: [
			"Pure render of its props; throttle updates upstream if they arrive faster than 10 per second.",
		],
		ai: [
			"Pass real byte counts. Pair with Stepper for a first-run setup flow, using `compact` inside a step.",
		],
	},
	impl: {
		react: { entry: "DownloadCard" },
		svelte: { entry: "DownloadCard" },
	},
	keywords: ["download", "progress", "speed", "eta", "setup", "model"],
});
