import { defineComponent, variantsOf } from "@baby-ui/registry-schema";
import { question as questionVariants } from "./variants";

const VARIANTS = ["muted", "outline", "plain"];
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
				"Question: `muted` is a filled card, `outline` a bordered one, `plain` none, for a Message bubble.",
			default: "muted",
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
			name: "title / onDismiss",
			type: "string / () => void",
			description: "QuestionHeader: the title once answered, and a close button.",
			control: { kind: "none" },
		},
		{
			name: "submitLabel",
			type: "string",
			description: "QuestionFooter: the last question's submit label.",
			default: "Submit response",
			control: { kind: "text" },
		},
		{
			name: "children",
			type: "ReactNode | Snippet",
			description:
				"Question: QuestionHeader, QuestionContent, QuestionFooter, QuestionResult. QuestionResult: the line shown once answered.",
			control: { kind: "none" },
		},
	],
	motion: {
		springs: [],
		reducedMotion:
			"The slide-in on each question drops; the progress dots keep their instant scale/opacity change.",
		behaviour: [
			"Each question slides in from the right and the title rises in as it changes.",
			"A single pick moves on 240ms later, so the choice is seen before the next question.",
			"Answering folds the options and footer away on grid rows, leaving the title and its result.",
			"The current dot grows; earlier dots stay solid.",
		],
	},
	a11y: {
		keyboard: [
			{ keys: ["Tab"], action: "Reaches each option" },
			{ keys: ["Enter", "Space"], action: "Selects" },
			{ keys: ["Arrow keys"], action: "Moves within a radio group" },
		],
		notes: [
			"Options are real `RadioGroup`/`Checkbox` primitives, not styled toggle buttons: full keyboard and screen-reader semantics come from the primitive, not reimplemented here.",
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
