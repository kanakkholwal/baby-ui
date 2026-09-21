<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getSelect } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const select = getSelect();
let el = $state<HTMLButtonElement>();

$effect(() => {
	select.setTrigger(el);
	return () => select.setTrigger(undefined);
});
</script>

<button
	{...rest}
	bind:this={el}
	type="button"
	role="combobox"
	data-slot="select-trigger"
	data-state={select.open ? "open" : "closed"}
	aria-expanded={select.open}
	aria-controls={select.open ? select.contentId : undefined}
	aria-haspopup="listbox"
	disabled={select.disabled}
	onclick={() => select.setOpen(!select.open)}
	class={cn(
		"inline-flex h-9 w-full items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors",
		"focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
		"disabled:cursor-not-allowed disabled:opacity-50",
		classProp,
	)}
>
	{@render children?.()}
	<svg
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		style:transform={select.open ? "rotate(180deg)" : "none"}
		class="size-3.5 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-200 ease-[var(--ease-out)]"
	>
		<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
</button>
