<script lang="ts">
import type { Snippet } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { CONTEXT_METER_ICONS } from "../variants";
import { contextMeterState } from "./context";

let {
	onclick,
	loading = false,
	class: classProp,
	children,
}: {
	onclick: () => void;
	/** The summary is being written. */
	loading?: boolean;
	class?: string;
	children?: Snippet;
} = $props();
const ctx = contextMeterState("ContextMeterCompact");
</script>

<!-- Summarizes the conversation to free space. -->
<Button data-slot="context-meter-compact" variant="secondary" size="sm" {loading} {onclick} class={cn(ctx.styles.compact(), classProp)}>
	<svg viewBox="0 0 24 24" aria-hidden="true" class="size-3.5 fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"><path d={CONTEXT_METER_ICONS.compact} /></svg>
	{#if children}{@render children()}{:else}Compact now{/if}
</Button>
