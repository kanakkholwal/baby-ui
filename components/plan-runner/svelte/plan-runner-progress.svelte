<script lang="ts">
import { cn } from "../../lib/cn";
import Tooltip from "../../tooltip/svelte/tooltip.svelte";
import TooltipContent from "../../tooltip/svelte/tooltip-content.svelte";
import TooltipProvider from "../../tooltip/svelte/tooltip-provider.svelte";
import TooltipTrigger from "../../tooltip/svelte/tooltip-trigger.svelte";
import { PLAN_STATUS_TEXT, type PlanSegment } from "../variants";
import { planRunnerState } from "./context";

let { segments, class: classProp }: { segments: PlanSegment[]; class?: string } =
	$props();
const ctx = planRunnerState("PlanRunnerProgress");
const s = $derived(ctx.styles);
const done = $derived(segments.filter((seg) => seg.status === "done").length);
</script>

<!-- One segment per step; point at one to read its step and status. -->
<div data-slot="plan-runner-progress" class={cn(s.progress(), classProp)}>
	<progress class="sr-only" max={segments.length} value={done}>{done} of {segments.length} steps done</progress>
	<TooltipProvider delayDuration={0}>
		{#each segments as seg, i (seg.id)}
			<Tooltip delay={0} onOpenChange={(open) => (ctx.active = open ? seg.id : null)}>
				<TooltipTrigger>
					{#snippet child({ props })}
						<button type="button" {...props} aria-label="Step {i + 1}, {seg.label}: {PLAN_STATUS_TEXT[seg.status]}" data-status={seg.status} data-active={ctx.active === seg.id || undefined} class={s.segment()}></button>
					{/snippet}
				</TooltipTrigger>
				<TooltipContent>
					<span class={s.tipTitle()}>{seg.label}</span>
					<span class={s.tipMeta()}>Step {i + 1} · {PLAN_STATUS_TEXT[seg.status]}</span>
				</TooltipContent>
			</Tooltip>
		{/each}
	</TooltipProvider>
</div>
