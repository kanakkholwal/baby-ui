<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getPopover } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const popover = getPopover();
let el = $state<HTMLButtonElement>();

$effect(() => {
	popover.setTrigger(el);
	return () => popover.setTrigger(undefined);
});
</script>

<button
	{...rest}
	bind:this={el}
	type="button"
	data-slot="popover-trigger"
	data-state={popover.open ? "open" : "closed"}
	aria-expanded={popover.open}
	aria-controls={popover.open ? popover.contentId : undefined}
	onclick={() => popover.setOpen(!popover.open)}
	class={cn(
		"inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
		classProp,
	)}
>
	{@render children?.()}
</button>
