<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getPopover } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const popover = getPopover();
let el = $state<HTMLDivElement>();
// Kept mounted after the first open so the surface can animate out as well as in.
let mounted = $state(false);

$effect(() => {
	if (popover.open) mounted = true;
});

$effect(() => {
	popover.setContent(el);
	return () => popover.setContent(undefined);
});
</script>

{#if mounted}
	<div
		{...rest}
		bind:this={el}
		id={popover.contentId}
		role="dialog"
		data-slot="popover-content"
		data-state={popover.open ? "open" : "closed"}
		inert={!popover.open}
		class={cn(
			ANCHORED,
			"w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
