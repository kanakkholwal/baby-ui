<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	orientation = "horizontal",
	label = "Toolbar",
	class: classProp,
}: {
	children: Snippet;
	orientation?: "horizontal" | "vertical";
	label?: string;
	class?: string;
} = $props();

let root = $state<HTMLDivElement>();
let index = $state(0);

function controls() {
	return [...(root?.querySelectorAll<HTMLElement>("[data-toolbar-item]") ?? [])];
}

// role=toolbar promises roving focus, so the whole bar is one tab stop.
function onkeydown(event: KeyboardEvent) {
	const items = controls();
	if (items.length === 0) return;
	const forward = orientation === "horizontal" ? "ArrowRight" : "ArrowDown";
	const back = orientation === "horizontal" ? "ArrowLeft" : "ArrowUp";

	let next: number | null = null;
	if (event.key === forward) next = (index + 1) % items.length;
	else if (event.key === back) next = (index - 1 + items.length) % items.length;
	else if (event.key === "Home") next = 0;
	else if (event.key === "End") next = items.length - 1;
	if (next === null) return;

	event.preventDefault();
	index = next;
	items[next]?.focus();
}

$effect(() => {
	for (const [i, el] of controls().entries()) {
		el.tabIndex = i === index ? 0 : -1;
	}
});
</script>

<div
	bind:this={root}
	role="toolbar"
	tabindex="-1"
	aria-label={label}
	aria-orientation={orientation}
	{onkeydown}
	class={cn(
		"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		orientation === "vertical" && "flex-col",
		classProp,
	)}
>
	{@render children()}
</div>
