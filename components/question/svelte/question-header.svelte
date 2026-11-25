<script lang="ts">
import { cn } from "../../lib/cn";
import { QUESTION_ICONS } from "../variants";
import { questionState } from "./context";

let {
	title,
	onDismiss,
	dismissLabel = "Dismiss questions",
	class: classProp,
}: {
	/** Shown once answered, in place of the last question's title. */
	title?: string;
	/** Shows a close button. */
	onDismiss?: () => void;
	/** Accessible name of the close button. */
	dismissLabel?: string;
	class?: string;
} = $props();
const q = questionState("QuestionHeader");
const s = $derived(q.styles);
const text = $derived(q.interactive ? q.item?.title : (title ?? q.item?.title));
const icon = $derived(q.busy ? QUESTION_ICONS.spinner : QUESTION_ICONS.check);
</script>

<!-- The place in the set, the current title (the group's name) and an optional close. -->
<div data-slot="question-header" class={cn(s.header(), classProp)}>
	{#if !q.interactive || q.busy}
		<span aria-hidden="true" data-status={q.status} class={s.icon()}>
			<svg viewBox="0 0 24 24" aria-hidden="true" class={q.busy ? s.spinner() : undefined}><path d={icon} /></svg>
		</span>
	{/if}
	<div class={s.heading()}>
		{#if q.interactive && q.questions.length > 1}
			<p class={s.eyebrow()}>Question {q.step + 1} of {q.questions.length}</p>
		{/if}
		<h3 id={q.titleId} tabindex="-1" class={s.title()} {@attach (el) => { q.setTitle(el); return () => q.setTitle(undefined); }}>
			{#key `${q.status}-${q.item?.id}`}<span class={s.titleText()}>{text}</span>{/key}
		</h3>
	</div>
	{#if onDismiss}
		<button type="button" aria-label={dismissLabel} onclick={onDismiss} class={s.dismiss()}>
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d={QUESTION_ICONS.close} /></svg>
		</button>
	{/if}
</div>
