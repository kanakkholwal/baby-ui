<script lang="ts">
import {
	Question,
	type QuestionAnswers,
	QuestionContent,
	QuestionFooter,
	QuestionHeader,
	type QuestionItem,
	QuestionResult,
	type QuestionStatus,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Question>>(props));

let status = $state<QuestionStatus>("pending");
let answers = $state<QuestionAnswers>({});
let timer = 0;
$effect(() => {
	status = p.status ?? "pending";
});
$effect(() => () => clearTimeout(timer));

const QUESTIONS: QuestionItem[] = [
	{
		id: "runtime",
		title: "Which runtime should this target?",
		options: [
			{ value: "edge", label: "Edge", description: "Fast cold starts, no Node APIs" },
			{ value: "node", label: "Node", description: "Full runtime, slower to start" },
			{ value: "both", label: "Both" },
		],
	},
	{
		id: "features",
		title: "Which features does it need?",
		description: "Pick any that apply, or add your own.",
		multiple: true,
		allowCustom: true,
		customPlaceholder: "Add another requirement…",
		options: [
			{ value: "streaming", label: "Streaming responses" },
			{ value: "auth", label: "Auth middleware" },
			{ value: "caching", label: "Response caching" },
		],
	},
	{
		id: "priority",
		title: "How urgent is this?",
		options: [
			{ value: "now", label: "Ship this week" },
			{ value: "soon", label: "Next sprint" },
			{ value: "later", label: "No rush" },
		],
	},
];

// Shows the picks in words once the card folds to its result.
const summary = $derived(
	QUESTIONS.map((q) => {
		const a = answers[q.id];
		const picked = (a?.selected ?? []).map(
			(v) => q.options?.find((o) => o.value === v)?.label ?? v,
		);
		if (a?.custom) picked.push(a.custom);
		return picked.join(", ");
	})
		.filter(Boolean)
		.join(" · "),
);
</script>

<div class="w-full max-w-sm">
	<Question
		variant={p.variant}
		{status}
		questions={QUESTIONS}
		bind:answers
		onSubmit={() => {
			status = "submitting";
			timer = window.setTimeout(() => (status = "answered"), 1200);
		}}
	>
		<QuestionHeader title="Got it" onDismiss={() => (status = "answered")} />
		<QuestionContent />
		<QuestionFooter />
		<QuestionResult>{summary || "Skipped"}</QuestionResult>
	</Question>
</div>
