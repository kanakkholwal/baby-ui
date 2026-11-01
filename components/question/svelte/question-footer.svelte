<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { isAnswered, QUESTION_ICONS } from "../variants";
import { questionState } from "./context";

let {
	submitLabel = "Submit response",
	class: classProp,
}: { submitLabel?: string; class?: string } = $props();
const q = questionState("QuestionFooter");
const s = $derived(q.styles);
const last = $derived(q.step === q.questions.length - 1);
const glyph =
	"fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]";
</script>

<!-- Back, a dot per question, and next, which submits on the last question. -->
<div data-slot="question-footer" data-open={q.interactive || undefined} class={s.fold()}>
	<div class={s.clip()} inert={!q.interactive}>
		<div class={cn(s.footer(), classProp)}>
			{#if q.questions.length > 1}
				<Button variant="ghost" size="icon-sm" aria-label="Previous question" disabled={q.busy || q.step === 0} onclick={() => q.setStep(q.step - 1)} class="rounded-full">
					<svg viewBox="0 0 24 24" aria-hidden="true" class={glyph}><path d={QUESTION_ICONS.back} /></svg>
				</Button>
				<span class={s.dots()}>
					<span class="sr-only">Question {q.step + 1} of {q.questions.length}</span>
					{#each q.questions as item, i (item.id)}
						<span aria-hidden="true" data-done={i <= q.step || undefined} data-current={i === q.step || undefined} class={s.dot()}></span>
					{/each}
				</span>
			{/if}
			<Button size={last ? "sm" : "icon-sm"} aria-label={last ? submitLabel : "Next question"} disabled={q.busy || !isAnswered(q.answer)} onclick={q.advance} class={s.next()}>
				{#if q.busy}
					<svg viewBox="0 0 24 24" aria-hidden="true" class="spinner {glyph}"><path d={QUESTION_ICONS.spinner} /></svg>
				{:else if last}
					{submitLabel}
					<svg viewBox="0 0 24 24" aria-hidden="true" class={glyph}><path d={QUESTION_ICONS.next} /></svg>
				{:else}
					<svg viewBox="0 0 24 24" aria-hidden="true" class={glyph}><path d={QUESTION_ICONS.next} /></svg>
				{/if}
			</Button>
		</div>
	</div>
</div>
