import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { question as questionVariants } from "./variants";

const VARIANTS = ["framed", "card", "plain"];
const STATUSES = ["pending", "submitting", "answered"];

export const question = defineComponent({
	slug: "question",
	name: "Question",
	description:
		"Clarifying questions an agent asks, one at a time with radio, checkbox or free-text answers, then folded to a one-line result.",
	category: "agents",
	status: "stable",
	variants: variantsOf(questionVariants, ["variant"]),
	props: [
		{
			name: "variant",
			type: VARIANTS.map((v) => `"${v}"`).join(" | "),
			description:
				"Question: `framed` holds the body in a card rim with the footer, `card` is one raised surface, `plain` has none, for a Message bubble.",
			default: "framed",
			control: { kind: "select", options: VARIANTS },
		},
		{
			name: "status",
			type: STATUSES.map((v) => `"${v}"`).join(" | "),
			description:
				"Question: `submitting` locks it with a spinner; `answered` folds it to QuestionResult.",
			default: "pending",
			control: { kind: "select", options: STATUSES },
		},
		{
			name: "questions",
			type: "QuestionItem[]",
			description:
				"Question: asked in order. Each has radio or checkbox (`multiple`) options with descriptions, an optional free-text field (`allowCustom`) and `autoAdvance`.",
			control: { kind: "none" },
		},
		{
			name: "answers / defaultAnswers / onAnswersChange",
			type: "QuestionAnswers",
			description: "Question: answers keyed by question id; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "step / defaultStep / onStepChange",
			type: "number",
			description: "Question: the question shown, from 0; bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "onSubmit",
			type: "(answers: QuestionAnswers) => void",
			description:
				"Question: called from the last question's submit. Set `status` from your request.",
			control: { kind: "none" },
		},
		{
			name: "title / onDismiss / dismissLabel",
			type: "string / () => void / string",
			description:
				"QuestionHeader: the title once answered, a close button, and the close button's accessible name.",
			control: { kind: "none" },
		},
		{
			name: "submitLabel / skipLabel / backLabel",
			type: "string",
			description:
				"QuestionFooter: the last question's submit label, and the Skip and Back button labels. A question with `required` has no Skip.",
			default: "Send / Skip / Back",
			control: { kind: "text" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"Question: QuestionBody wrapping QuestionHeader, QuestionContent and QuestionResult, then QuestionFooter. QuestionResult: the line shown once answered.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The slide-in on each question drops, and the title and progress segments change without easing.",
		behaviour: [
			"Each question slides in from the right and the title rises in as it changes; the current progress segment widens.",
			"A single pick moves on 240ms later, so the choice is seen before the next question.",
			"Answering folds the options and footer away on grid rows, leaving the title and its result.",
			"Each answer is a tile: hover lifts it, a press sinks it to 0.97, and a checked one tints with the primary colour.",
			"A segment per question: finished ones fill softly, the current one widens and fills solid.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab"], action: "Reaches each option" },
			{ keys: ["Enter", "Space"], action: "Selects" },
			{ keys: ["Arrow keys"], action: "Moves within a radio group" },
			{ keys: ["Tab"], action: "Then reaches the free-text field, Back, Skip and Next" },
		],
		notes: [
			"Options are real `RadioGroup`/`Checkbox` primitives, not styled toggle buttons: full keyboard and screen-reader semantics come from the primitive, not reimplemented here.",
			"The root is a native fieldset named by the current title, and described by the question's description; the radio group is named by the same title.",
			'When the question changes, the new title takes focus and a polite status line reads "Question 2 of 3: ...". Sending is announced too, and the card is aria-busy meanwhile.',
			"Each answer tile is the label of its radio or checkbox, so the whole row is the target (at least 56px tall); buttons grow to 44px on coarse pointers and the close button has a 44px hit area.",
			"A checked tile never relies on colour alone: the radio fills and, in forced-colours mode, the tile gets an outline.",
			"The submit control is disabled, not hidden, until the current question has an answer, so its position never shifts.",
		],
	},
	licenseOrigin: {
		source: "beui",
		url: "https://github.com/starc007/ui-components",
		license: "MIT",
		copyright: "Copyright (c) 2026 Saurabh Chauhan",
	},
	impl: {
		react: {
			entry: "Question",
		},
		svelte: {
			entry: "Question",
		},
	},
	keywords: ["question", "prompt", "form", "agent"],
});
