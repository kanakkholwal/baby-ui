<script lang="ts">
import { cn } from "../../lib/cn";
import Tooltip from "../../tooltip/svelte/tooltip.svelte";
import TooltipContent from "../../tooltip/svelte/tooltip-content.svelte";
import TooltipProvider from "../../tooltip/svelte/tooltip-provider.svelte";
import TooltipTrigger from "../../tooltip/svelte/tooltip-trigger.svelte";
import { formatTokens, segmentColor } from "../variants";
import { contextMeterState } from "./context";

let { class: classProp }: { class?: string } = $props();
const ctx = contextMeterState("ContextMeterBar");
const s = $derived(ctx.styles);
const scale = $derived(Math.max(ctx.limit, ctx.used));
</script>

<!-- One segment per source, the free space, and a tick where auto-compaction starts. -->
<div data-slot="context-meter-bar" class={cn(s.bar(), classProp)}>
	<meter class="sr-only" min={0} max={ctx.limit} value={Math.min(ctx.used, ctx.limit)} aria-label="Context used">{formatTokens(ctx.used)} of {formatTokens(ctx.limit)}</meter>
	<TooltipProvider delayDuration={0}>
		{#each ctx.segments as segment, i (segment.id)}
			{#if segment.value > 0}
				<Tooltip delay={0} onOpenChange={(open) => (ctx.active = open ? segment.id : null)}>
					<TooltipTrigger>
						{#snippet child({ props })}
							<button type="button" {...props} aria-label="{segment.label}, {formatTokens(segment.value)}" data-active={ctx.active === segment.id || undefined} class={s.segment()} style:width="{(segment.value / scale) * 100}%" style:--segment={segmentColor(segment, i)}></button>
						{/snippet}
					</TooltipTrigger>
					<TooltipContent>
						<span class={s.tipTitle()}>{segment.label}</span>
						<span class={s.tipMeta()}>{formatTokens(segment.value)} · {((segment.value / Math.max(ctx.used, 1)) * 100).toFixed(1)}% of use</span>
					</TooltipContent>
				</Tooltip>
			{/if}
		{/each}
	</TooltipProvider>
	<span aria-hidden="true" class={s.track()}></span>
	<span aria-hidden="true" class={s.threshold()} style:left="{ctx.compactAt * 100}%"></span>
</div>
