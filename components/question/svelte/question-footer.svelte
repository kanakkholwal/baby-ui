<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { isAnswered, QUESTION_ICONS } from "../variants";
import { questionState } from "./context";

let {
	submitLabel = "Send",
	skipLabel = "Skip",
	backLabel = "Back",
	class: classProp,
}: {
	/** The last question's submit label. */
	submitLabel?: string;
	/** Label of the button that moves on without an answer; hidden for `required` questions. */
	skipLabel?: string;
	/** Label of the button that returns to the previous question. */
	backLabel?: string;
	class?: string;
} = $props();
const q = questionState("QuestionFooter");
const s = $derived(q.styles);
const last = $derived(q.step === q.questions.length - 1);
</script>

<!-- Progress, then Back, Skip and Next; Next submits on the last question. -->
<div data-slot="question-footer" data-open={q.interactive || undefined} class={s.fold()}>
	<div class={s.clip()} inert={!q.interactive}>
		<div class={cn(s.footer(), classProp)}>
			{#if q.questions.length > 1}
				<span aria-hidden="true" class={s.steps()}>
					{#each q.questions as item, i (item.id)}
						<span data-done={i < q.step || undefined} data-current={i === q.step || undefined} class={s.step()}></span>
					{/each}
				</span>
			{/if}
			<div class={s.actions()}>
				{#if q.step > 0}
					<Button variant="ghost" disabled={q.busy} onclick={() => q.setStep(q.step - 1)} class={s.back()}>{backLabel}</Button>
				{/if}
				{#if !q.item?.required}
					<Button variant="ghost" disabled={q.busy} onclick={q.advance} class={s.skip()}>{skipLabel}</Button>
				{/if}
				<Button disabled={q.busy || !isAnswered(q.answer)} onclick={q.advance} class={s.next()}>
					{#if q.busy}
						<svg viewBox="0 0 24 24" aria-hidden="true" class="spinner fill-none stroke-current [stroke-linecap:round] [stroke-width:2]"><path d={QUESTION_ICONS.spinner} /></svg>
					{:else if last}
						{submitLabel}
					{:else}
						Next
					{/if}
				</Button>
			</div>
		</div>
	</div>
</div>
