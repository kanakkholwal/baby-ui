<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

let {
	trigger,
	children,
	placement = "bottom-start",
	openDelay = 300,
	closeDelay = 150,
	class: classProp,
}: {
	trigger: Snippet;
	children: Snippet;
	placement?: AnchorPlacement;
	openDelay?: number;
	closeDelay?: number;
	class?: string;
} = $props();

const id = $props.id();
let open = $state(false);
let wrapper = $state<HTMLSpanElement>();
let floating = $state<HTMLDivElement>();
let timer: ReturnType<typeof setTimeout>;

function schedule(next: boolean) {
	clearTimeout(timer);
	timer = setTimeout(() => (open = next), next ? openDelay : closeDelay);
}

$effect(() => {
	if (!open || !wrapper || !floating) return;
	return anchor(wrapper, floating, { placement, gap: 8 });
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={wrapper}
	class="inline-flex"
	onpointerenter={() => schedule(true)}
	onpointerleave={() => schedule(false)}
	onfocusin={() => schedule(true)}
	onfocusout={() => schedule(false)}
	aria-describedby={open ? id : undefined}
>
	{@render trigger()}
</span>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="dialog"
		tabindex="-1"
		onpointerenter={() => schedule(true)}
		onpointerleave={() => schedule(false)}
		class={cn(
			"anchored z-50 w-64 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	>
		{@render children()}
	</div>
{/if}
