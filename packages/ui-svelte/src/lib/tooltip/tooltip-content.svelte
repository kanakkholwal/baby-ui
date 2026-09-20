<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTooltip } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const tooltip = getTooltip();
let el = $state<HTMLDivElement>();

$effect(() => {
	tooltip.setContent(el);
	return () => tooltip.setContent(undefined);
});
</script>

{#if tooltip.open}
	<div
		{...rest}
		bind:this={el}
		id={tooltip.contentId}
		role="tooltip"
		data-slot="tooltip-content"
		data-state="open"
		class={cn(
			"anchored pointer-events-none z-50 rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
