<script lang="ts">
import { untrack } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import {
	EMPTY_ANSWER,
	type QuestionAnswers,
	type QuestionItem,
	type QuestionStatus,
	type QuestionVariant,
	question,
} from "../variants";
import { setQuestion } from "./context";

let {
	questions,
	status = "pending",
	answers = $bindable(untrack(() => ({}) as QuestionAnswers)),
	onAnswersChange,
	step = $bindable(0),
	onStepChange,
	onSubmit,
	variant = "framed",
	class: classProp,
	children,
	...rest
}: Omit<HTMLAttributes<HTMLFieldSetElement>, "onsubmit"> & {
	questions: QuestionItem[];
	/** `submitting` locks the card with a spinner; `answered` folds it to its result. */
	status?: QuestionStatus;
	/** Every answer by question id; bindable. */
	answers?: QuestionAnswers;
	onAnswersChange?: (answers: QuestionAnswers) => void;
	/** The question shown, from 0; bindable. */
	step?: number;
	onStepChange?: (step: number) => void;
	onSubmit?: (answers: QuestionAnswers) => void;
	variant?: QuestionVariant;
} = $props();

let timer: number | undefined;
const uid = $props.id();
let titleEl = $state<HTMLElement>();
let announcement = $state("");
const index = $derived(Math.min(Math.max(0, step), Math.max(0, questions.length - 1)));
const item = $derived(questions[index]);
const busy = $derived(status === "submitting");
const interactive = $derived(status === "pending" || busy);
const styles = $derived(question({ variant }));
$effect(() => () => window.clearTimeout(timer));

// A new question is spoken and takes focus; the first render and plain updates stay quiet.
let seen = { index: untrack(() => index), status: untrack(() => status) };
$effect(() => {
	const now = { index, status };
	const before = seen;
	seen = now;
	if (now.status === "pending" && now.index !== before.index && item) {
		announcement = `Question ${now.index + 1} of ${questions.length}: ${item.title}`;
		titleEl?.focus({ preventScroll: true });
	} else if (now.status === "submitting" && before.status !== "submitting") {
		announcement = "Sending your answers";
	}
});

function setStep(next: number) {
	window.clearTimeout(timer);
	step = next;
	onStepChange?.(next);
}

setQuestion({
	get questions() {
		return questions;
	},
	get item() {
		return item;
	},
	get step() {
		return index;
	},
	get answer() {
		return item ? (answers[item.id] ?? EMPTY_ANSWER) : EMPTY_ANSWER;
	},
	get status() {
		return status;
	},
	get interactive() {
		return interactive;
	},
	get busy() {
		return busy;
	},
	get styles() {
		return styles;
	},
	setAnswer(next) {
		if (!item) return;
		answers = { ...answers, [item.id]: next };
		onAnswersChange?.(answers);
	},
	setStep,
	titleId: `${uid}-title`,
	descriptionId: `${uid}-description`,
	setTitle(el) {
		titleEl = el;
	},
	advance() {
		if (index < questions.length - 1) setStep(index + 1);
		else onSubmit?.(answers);
	},
	// A single pick moves on after a beat, so the choice is seen before the next question.
	queueAdvance() {
		if (!item || item.multiple || item.autoAdvance === false || busy) return;
		if (index >= questions.length - 1) return;
		window.clearTimeout(timer);
		timer = window.setTimeout(() => setStep(index + 1), 240);
	},
});
</script>

<!-- The root: clarifying questions an agent asks, one at a time, then a one-line result.
     A native fieldset named by the current title; a step change is announced and focuses that title. -->
<fieldset
	data-slot="question"
	data-status={status}
	data-variant={variant}
	aria-labelledby="{uid}-title"
	aria-describedby={interactive && item?.description ? `${uid}-description` : undefined}
	aria-busy={busy}
	class={cn(styles.root(), classProp)}
	{...rest}
>
	{@render children?.()}
	<p role="status" class="sr-only">{announcement}</p>
</fieldset>
