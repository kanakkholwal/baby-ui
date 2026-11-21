import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { transcriptRow as transcriptRowVariants } from "./variants";

const VARIANTS = ["card", "plain"];
const STATUSES = ["queued", "running", "done", "failed"];

export const transcriptRow = defineComponent({
	slug: "transcript-row",
	name: "Transcript Row",
	description:
		"A saved transcript, as a history entry or a file job with status, progress, cancel and retry.",
	category: "agents",
	status: "alpha",
	variants: variantsOf(transcriptRowVariants, ["variant", "status", "clamp"]),
	props: [
		{
			name: "status",
			type: STATUSES.map((value) => `"${value}"`).join(" | "),
			description:
				"A file job's stage. Leave it off for a history entry: no badge, and Copy always shows.",
			control: { kind: "none" },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description: "A card with a hover fill, or no surface for a bare list.",
			default: "card",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "clamp",
			type: "boolean",
			description: "Limit the text to three lines.",
			default: false,
			control: { kind: "boolean" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "No motion beyond colour changes.",
		behaviour: [
			"The card fill eases in on hover; the progress bar fills as the value changes.",
		],
	},
	a11y: {
		notes: [
			"A list item; wrap rows in a ul.",
			"Status is a written badge, never colour alone.",
			"Cancel, Retry and Copy render only when they apply and, for the first two, when a handler is passed.",
		],
	},
	guidance: {
		when: ["Dictation history, meeting notes and file transcription queues."],
		whenNot: [{ text: "Streaming text that is still arriving.", use: "live-transcript" }],
		responsive: ["Titles truncate; the actions keep their size."],
		performance: ["Pure render of its props."],
		ai: [
			"Pass status and progress from your job store. Put Copy, Cancel and Retry inside TranscriptRowActions.",
		],
	},
	impl: {
		react: { entry: "TranscriptRow" },
		svelte: { entry: "TranscriptRow" },
	},
	keywords: ["transcript", "history", "dictation", "file", "job", "queue"],
});
