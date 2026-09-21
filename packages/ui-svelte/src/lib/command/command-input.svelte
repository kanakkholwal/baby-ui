<script lang="ts">
import type { HTMLInputAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCommand } from "./context";

let {
	placeholder = "Type a command or search…",
	class: classProp,
	...rest
}: { placeholder?: string; class?: string } & HTMLInputAttributes = $props();

const command = getCommand();
let el = $state<HTMLInputElement>();
let spoken = $state("");

$effect(() => {
	el?.focus();
});

// Debounced so a live region does not narrate every keystroke, only where it settles.
$effect(() => {
	const count = command.resultCount;
	const timer = setTimeout(() => {
		spoken =
			count === 0
				? "No commands match."
				: `${count} ${count === 1 ? "command" : "commands"} available.`;
	}, 400);
	return () => clearTimeout(timer);
});

function onkeydown(event: KeyboardEvent) {
	if (event.key === "ArrowDown") {
		event.preventDefault();
		command.move(1);
	} else if (event.key === "ArrowUp") {
		event.preventDefault();
		command.move(-1);
	} else if (event.key === "Home") {
		event.preventDefault();
		command.first();
	} else if (event.key === "End") {
		event.preventDefault();
		command.last();
	} else if (event.key === "Enter") {
		event.preventDefault();
		command.select();
	}
}
</script>

<div class="flex shrink-0 items-center gap-2 border-border border-b px-3">
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
		<circle cx="7.2" cy="7.2" r="4.2" stroke="currentColor" stroke-width="1.4" />
		<path d="m10.4 10.4 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
	</svg>
	<input
		{...rest}
		bind:this={el}
		type="text"
		role="combobox"
		data-slot="command-input"
		aria-expanded="true"
		aria-controls={command.listId}
		aria-activedescendant={command.activeId || undefined}
		{placeholder}
		value={command.query}
		oninput={(event) => command.setQuery(event.currentTarget.value)}
		{onkeydown}
		class={cn(
			"h-12 w-full bg-transparent text-foreground text-sm outline-none placeholder:text-muted-foreground",
			classProp,
		)}
	/>
	<span
		class="min-w-[2ch] shrink-0 text-right font-mono text-[11px] text-muted-foreground tabular-nums"
		aria-hidden="true"
	>
		{command.resultCount}
	</span>
	<span role="status" aria-live="polite" class="sr-only">{spoken}</span>
</div>
