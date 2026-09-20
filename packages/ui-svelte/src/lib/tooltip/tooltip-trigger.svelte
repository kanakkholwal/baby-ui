<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getTooltip } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLSpanElement> = $props();

const tooltip = getTooltip();
let el = $state<HTMLSpanElement>();

$effect(() => {
	tooltip.setTrigger(el);
	return () => tooltip.setTrigger(undefined);
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	{...rest}
	bind:this={el}
	data-slot="tooltip-trigger"
	data-state={tooltip.open ? "open" : "closed"}
	aria-describedby={tooltip.open ? tooltip.contentId : undefined}
	onpointerenter={() => tooltip.show()}
	onpointerleave={tooltip.hide}
	onfocusin={() => tooltip.show(true)}
	onfocusout={tooltip.hide}
	class={cn("inline-flex", classProp)}
>
	{@render children?.()}
</span>
