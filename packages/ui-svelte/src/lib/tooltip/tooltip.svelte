<script lang="ts">
import type { Snippet } from "svelte";
import { type AnchorPlacement, anchor } from "../lib/anchor";
import { cn } from "../lib/cn";

let {
	children,
	label,
	placement = "top",
	delay = 400,
	class: classProp,
}: {
	children: Snippet;
	label: string;
	placement?: AnchorPlacement;
	delay?: number;
	class?: string;
} = $props();

const id = $props.id();
let open = $state(false);
let wrapper = $state<HTMLSpanElement>();
let floating = $state<HTMLDivElement>();
let timer: ReturnType<typeof setTimeout>;

function show(immediate = false) {
	clearTimeout(timer);
	timer = setTimeout(() => (open = true), immediate ? 0 : delay);
}

function hide() {
	clearTimeout(timer);
	open = false;
}

$effect(() => {
	if (!open || !wrapper || !floating) return;
	return anchor(wrapper, floating, { placement, gap: 6 });
});

$effect(() => {
	if (!open) return;
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") hide();
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<span
	bind:this={wrapper}
	class="inline-flex"
	onpointerenter={() => show()}
	onpointerleave={hide}
	onfocusin={() => show(true)}
	onfocusout={hide}
	aria-describedby={open ? id : undefined}
>
	{@render children()}
</span>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="tooltip"
		class={cn(
			"anchored pointer-events-none z-50 rounded-md border border-border bg-popover px-2 py-1 text-foreground text-xs shadow-lg",
			classProp,
		)}
	>
		{label}
	</div>
{/if}
