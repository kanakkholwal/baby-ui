<script lang="ts">
import { Question, type QuestionAnswers, type QuestionItem } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Question>>(props));

let submitted = $state<QuestionAnswers | null>(null);

const QUESTIONS: QuestionItem[] = [
	{
		id: "runtime",
		title: "Which runtime should this target?",
		options: [
			{ value: "edge", label: "Edge" },
			{ value: "node", label: "Node" },
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

const layout = $derived(p.layout ?? "card");
</script>

<div class="w-full max-w-sm">
	{#key layout}
		<Question {layout} questions={QUESTIONS} onSubmit={(a) => (submitted = a)} />
	{/key}
	{#if submitted}
		<p class="mt-2 text-muted-foreground text-xs">Submitted: {JSON.stringify(submitted)}</p>
	{/if}
</div>
