<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getPopover } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const popover = getPopover();
let el = $state<HTMLDivElement>();

$effect(() => {
	popover.setContent(el);
	return () => popover.setContent(undefined);
});
</script>

{#if popover.open}
	<div
		{...rest}
		bind:this={el}
		id={popover.contentId}
		role="dialog"
		data-slot="popover-content"
		data-state="open"
		class={cn(
			"anchored z-50 w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
