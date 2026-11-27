import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { pollVote as pollVoteVariants } from "./variants";

const SIZES = ["sm", "default", "lg"];

export const pollVote = defineComponent({
	slug: "poll-vote",
	name: "Poll Vote",
	description:
		"A poll you answer with one tap: your ring fills and draws a check, the bars fill in a wave and each share counts up.",
	category: "animated",
	status: "alpha",
	variants: variantsOf(pollVoteVariants, ["size"]),
	props: [
		{
			name: "options",
			type: "{ id: string; label: string; votes: number }[]",
			description:
				"The choices. `votes` is the count before the viewer's vote; their vote adds 1 to the shares.",
			required: true,
			control: { kind: "none" },
		},
		{
			name: "value",
			type: "string | null",
			description:
				"The viewer's choice, or null before they vote. Controlled (bindable in Svelte), or `defaultValue` to let it drive itself.",
			control: { kind: "none" },
		},
		{
			name: "onValueChange",
			type: "(value: string | null) => void",
			description:
				"Fired with the option id when the viewer votes or changes their vote.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: SIZES.map((value) => `"${value}"`).join(" | "),
			description: "Row height: 32, 40 or 48px.",
			default: "default",
			control: { kind: "select", options: SIZES },
		},
		{
			name: "labels",
			type: "Partial<{ poll: string; percent: string; voted: string; votes: string }>",
			description:
				"Replace any built-in string. `{label}`, `{percent}` and `{count}` fill in.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion: "Bars, rings and shares change without travelling or counting.",
		behaviour: [
			"A first vote fills your bar first and the rest follow 60ms apart, each over --duration-slow.",
			"Moving a vote shifts every bar at once; clearing drains them over --duration-base.",
			"Each share counts up as it slides in from the right, and the vote total ticks over.",
			"Your ring fills with a pop and the check draws in over --duration-base.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab", "Enter", "Space"], action: "Moves between options and votes" },
		],
		notes: [
			'A radiogroup of radio buttons; once voted, each option is named with its share, for example "Springs, 42%".',
			"A polite live region announces which option you voted for.",
		],
	},
	impl: {
		react: { entry: "PollVote" },
		svelte: { entry: "PollVote" },
	},
	keywords: ["poll", "vote", "survey", "results", "bars", "percent"],
});
