<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor, dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

let {
	trigger,
	children,
	open = $bindable(false),
	placement = "bottom-start",
	gap = 6,
	class: classProp,
}: {
	trigger: Snippet;
	children: Snippet;
	open?: boolean;
	placement?: AnchorPlacement;
	gap?: number;
	class?: string;
} = $props();

const id = $props.id();
let triggerEl = $state<HTMLButtonElement>();
let floating = $state<HTMLDivElement>();

$effect(() => {
	if (!open || !triggerEl || !floating) return;
	const stopAnchor = anchor(triggerEl, floating, { placement, gap });
	const stopDismiss = dismissable([triggerEl, floating], () => {
		open = false;
		triggerEl?.focus();
	});
	return () => {
		stopAnchor();
		stopDismiss();
	};
});
</script>

<button
	bind:this={triggerEl}
	type="button"
	aria-expanded={open}
	aria-controls={open ? id : undefined}
	onclick={() => (open = !open)}
	class="inline-flex rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
>
	{@render trigger()}
</button>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="dialog"
		class={cn(
			"anchored z-50 w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	>
		{@render children()}
	</div>
{/if}
