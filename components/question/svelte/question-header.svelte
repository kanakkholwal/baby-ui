<script lang="ts">
import { cn } from "../../lib/cn";
import { QUESTION_ICONS } from "../variants";
import { questionState } from "./context";

let {
	title,
	onDismiss,
	class: classProp,
}: {
	/** Shown once answered, in place of the last question's title. */
	title?: string;
	/** Shows a close button. */
	onDismiss?: () => void;
	class?: string;
} = $props();
const q = questionState("QuestionHeader");
const s = $derived(q.styles);
const text = $derived(q.interactive ? q.item?.title : (title ?? q.item?.title));
const icon = $derived(
	q.busy
		? QUESTION_ICONS.spinner
		: q.interactive
			? QUESTION_ICONS.help
			: QUESTION_ICONS.check,
);
</script>

<!-- The icon, the current question's title, its place in the set, and an optional close. -->
<div data-slot="question-header" class={cn(s.header(), classProp)}>
	<span aria-hidden="true" data-status={q.status} class={s.icon()}>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={q.busy ? s.spinner() : undefined}><path d={icon} /></svg>
	</span>
	<div class={s.heading()}>
		<h3 class={s.title()}>
			{#key `${q.status}-${q.item?.id}`}<span class={s.titleText()}>{text}</span>{/key}
		</h3>
		{#if q.interactive && q.questions.length > 1}
			<span class={s.counter()}>{q.step + 1}/{q.questions.length}</span>
		{/if}
		{#if onDismiss}
			<button type="button" aria-label="Dismiss" onclick={onDismiss} class={s.dismiss()}>
				<svg viewBox="0 0 24 24" aria-hidden="true"><path d={QUESTION_ICONS.close} /></svg>
			</button>
		{/if}
	</div>
</div>
