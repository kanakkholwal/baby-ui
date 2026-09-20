<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getHoverCard } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const card = getHoverCard();
let el = $state<HTMLDivElement>();
// Kept mounted after the first open so the surface can animate out as well as in.
let mounted = $state(false);

$effect(() => {
	if (card.open) mounted = true;
});

$effect(() => {
	card.setContent(el);
	return () => card.setContent(undefined);
});
</script>

{#if mounted}
	<div
		{...rest}
		bind:this={el}
		id={card.contentId}
		role="dialog"
		tabindex="-1"
		data-slot="hover-card-content"
		data-state={card.open ? "open" : "closed"}
		inert={!card.open}
		onpointerenter={() => card.schedule(true)}
		onpointerleave={() => card.schedule(false)}
		class={cn(
			ANCHORED,
			"w-64 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
