<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getHoverCard } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLSpanElement> = $props();

const card = getHoverCard();
let el = $state<HTMLSpanElement>();

$effect(() => {
	card.setTrigger(el);
	return () => card.setTrigger(undefined);
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	{...rest}
	bind:this={el}
	data-slot="hover-card-trigger"
	data-state={card.open ? "open" : "closed"}
	aria-describedby={card.open ? card.contentId : undefined}
	onpointerenter={() => card.schedule(true)}
	onpointerleave={() => card.schedule(false)}
	onfocusin={() => card.schedule(true)}
	onfocusout={() => card.schedule(false)}
	class={cn("inline-flex", classProp)}
>
	{@render children?.()}
</span>
