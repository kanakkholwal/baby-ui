import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { upvoteButton as upvoteButtonVariants } from "./variants";

const ORIENTATIONS = ["vertical", "horizontal"];
const VARIANTS = ["default", "secondary", "success", "warning", "info", "destructive"];

export const upvoteButton = defineComponent({
	slug: "upvote-button",
	name: "Upvote Button",
	description:
		"A vote toggle where the vote rises through the button: the fill climbs, the arrow swaps, a +1 floats away and the count rolls.",
	category: "animated",
	status: "alpha",
	variants: variantsOf(upvoteButtonVariants, ["variant", "orientation"]),
	props: [
		{
			name: "count",
			type: "number",
			description: "Votes from everyone else. The viewer's own vote is added on top.",
			default: "482",
			required: true,
			control: { kind: "number", min: 0, max: 9999, step: 1 },
		},
		{
			name: "voted",
			type: "boolean",
			description:
				"Whether the viewer has voted. Controlled (bindable in Svelte), or `defaultVoted` to let it drive itself.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "onVotedChange",
			type: "(voted: boolean) => void",
			description:
				"Fired with the next state when the viewer votes or takes the vote back.",
			control: { kind: "none" },
		},
		{
			name: "orientation",
			type: ORIENTATIONS.map((value) => `"${value}"`).join(" | "),
			description: "Stack the arrow over the count, or place them side by side.",
			default: "vertical",
			control: { kind: "select", options: ORIENTATIONS },
		},
		{
			name: "variant",
			type: VARIANTS.map((value) => `"${value}"`).join(" | "),
			description:
				"The fill colour: the brand colour, a neutral, or a status colour. For any other colour set `--upvote-color` and `--upvote-on` on the class.",
			default: "default",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "label",
			type: "string",
			description: "Names the button for assistive tech.",
			default: "Upvote",
			control: { kind: "text" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The fill, the arrow swap and the count change without travelling; the +1 does not float.",
		behaviour: [
			"The fill rises over --duration-slow and drains over --duration-base, so taking a vote back is quicker.",
			"The outline arrow leaves through the top while the filled one rises from below; a take-back runs it downward.",
			"A vote floats a +1 up and away; the count rolls to the new total. A press scales to --press-scale.",
		],
	},
	a11y: {
		keyboard: [{ keys: ["Enter", "Space"], action: "Votes, or takes the vote back" }],
		notes: [
			"A toggle button: aria-pressed carries the state and aria-label names it.",
			"The +1 is decorative and hidden from assistive tech; the count is read as part of the button.",
		],
	},
	impl: {
		react: { entry: "UpvoteButton" },
		svelte: { entry: "UpvoteButton" },
	},
	keywords: ["upvote", "vote", "like", "toggle", "count", "reddit", "arrow"],
});
