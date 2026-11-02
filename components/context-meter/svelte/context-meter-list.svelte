<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { CONTEXT_METER_ICONS, formatTokens, segmentColor } from "../variants";
import { contextMeterState } from "./context";

let {
	pinnedLabel = "Pinned",
	class: classProp,
}: { pinnedLabel?: string; class?: string } = $props();
const ctx = contextMeterState("ContextMeterList");
const s = $derived(ctx.styles);
</script>

<!-- A row per source: its colour, label, note, size, and a lock or an action. -->
<ul data-slot="context-meter-list" class={cn(s.list(), classProp)}>
	{#each ctx.segments as segment, i (segment.id)}
		<li
			data-active={ctx.active === segment.id || undefined}
			onpointerenter={() => (ctx.active = segment.id)}
			onpointerleave={() => (ctx.active = null)}
			onfocusin={() => (ctx.active = segment.id)}
			onfocusout={() => (ctx.active = null)}
			class={s.row()}
		>
			<span aria-hidden="true" class={s.dot()} style:background={segmentColor(segment, i)}></span>
			<span class={s.label()}>{segment.label}</span>
			<span class={s.detail()}>{segment.detail ?? ""}</span>
			<span class={s.value()}>{formatTokens(segment.value)}</span>
			<span class={s.trailing()}>
				{#if segment.pinned}
					<span class={s.pinned()}>
						<svg viewBox="0 0 24 24" aria-hidden="true" class="fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"><path d={CONTEXT_METER_ICONS.lock} /></svg>
						{pinnedLabel}
					</span>
				{:else if segment.action && ctx.onAction}
					{@const act = ctx.onAction}
					<Button variant="ghost" size="sm" onclick={() => act(segment.id)} aria-label="{segment.action} {segment.label}" class={s.action()}>{segment.action}</Button>
				{/if}
			</span>
		</li>
	{/each}
</ul>
