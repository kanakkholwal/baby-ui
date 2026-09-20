<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getTooltip } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const tooltip = getTooltip();
let el = $state<HTMLDivElement>();
// Kept mounted after the first open so the surface can animate out as well as in.
let mounted = $state(false);

$effect(() => {
	if (tooltip.open) mounted = true;
});

$effect(() => {
	tooltip.setContent(el);
	return () => tooltip.setContent(undefined);
});
</script>

{#if mounted}
	<div
		{...rest}
		bind:this={el}
		id={tooltip.contentId}
		role="tooltip"
		data-slot="tooltip-content"
		data-state={tooltip.open ? "open" : "closed"}
		inert={!tooltip.open}
		class={cn(
			ANCHORED,
			"rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
			"data-[state=open]:pointer-events-none",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
