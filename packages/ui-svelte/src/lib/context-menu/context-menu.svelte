<script lang="ts">
import type { Snippet } from "svelte";
import { dismissable } from "../lib/anchor";
import { cn } from "../lib/cn";

export type ContextItem = { id: string; label: string; destructive?: boolean };

let {
	children,
	items,
	class: classProp,
	onselect,
}: {
	children: Snippet;
	items: ContextItem[];
	class?: string;
	onselect?: (id: string) => void;
} = $props();

const id = $props.id();
let open = $state(false);
let point = $state({ x: 0, y: 0 });
let floating = $state<HTMLDivElement>();

function openAt(event: MouseEvent) {
	event.preventDefault();
	point = { x: event.clientX, y: event.clientY };
	open = true;
}

// Positioned from a point rather than an element, so it clamps rather than flips.
$effect(() => {
	if (!open || !floating) return;
	const rect = floating.getBoundingClientRect();
	const x = Math.min(point.x, window.innerWidth - rect.width - 8);
	const y = Math.min(point.y, window.innerHeight - rect.height - 8);
	floating.style.transform = `translate(${Math.max(8, x)}px, ${Math.max(8, y)}px)`;
	return dismissable([floating], () => (open = false));
});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div oncontextmenu={openAt} class="contents">
	{@render children()}
</div>

{#if open}
	<div
		bind:this={floating}
		{id}
		role="menu"
		tabindex="-1"
		style:position="fixed"
		style:left="0"
		style:top="0"
		style:transform-origin="top left"
		class={cn(
			"anchored z-50 min-w-44 rounded-xl border border-border bg-popover p-1 shadow-2xl",
			classProp,
		)}
	>
		{#each items as item (item.id)}
			<button
				type="button"
				role="menuitem"
				onclick={() => {
					onselect?.(item.id);
					open = false;
				}}
				class={cn(
					"flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-sm outline-none transition-colors hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
					item.destructive ? "text-[var(--destructive)]" : "text-foreground",
				)}
			>
				{item.label}
			</button>
		{/each}
	</div>
{/if}
