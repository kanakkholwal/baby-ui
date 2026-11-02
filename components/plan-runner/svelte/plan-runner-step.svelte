<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { PLAN_ICONS, PLAN_STATUS_TEXT, type PlanStepStatus } from "../variants";
import { planRunnerState, setPlanStep } from "./context";

let {
	status,
	class: classProp,
	children,
}: { status: PlanStepStatus; class?: string; children?: Snippet } = $props();
const ctx = planRunnerState("PlanRunnerStep");
const s = $derived(ctx.styles);
setPlanStep({
	get status() {
		return status;
	},
});
</script>

<!-- One step on the timeline: a marker for `status`, then its head and output. -->
<li data-slot="plan-runner-step" data-status={status} class={cn(s.step(), classProp)}>
	<span aria-hidden="true" data-status={status} class={s.connector()}></span>
	<span aria-hidden="true" data-status={status} class={s.marker()}>
		{#if status === "running"}
			<svg viewBox="0 0 24 24" aria-hidden="true" class={s.spinner()}><path d={PLAN_ICONS.running} /></svg>
		{:else if status === "done" || status === "failed"}
			<svg viewBox="0 0 24 24" aria-hidden="true"><path d={PLAN_ICONS[status]} /></svg>
		{/if}
	</span>
	<div class={s.content()}>
		<span class="sr-only">{PLAN_STATUS_TEXT[status]}: </span>
		{@render children?.()}
	</div>
</li>
