<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { UNFOLD_ITEM } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getSelect } from "./context";

let {
	children,
	value,
	disabled = false,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	value: string;
	disabled?: boolean;
	class?: string;
} & HTMLButtonAttributes = $props();

const select = getSelect();
let el = $state<HTMLButtonElement>();
const selected = $derived(select.value === value);

// The trigger echoes the chosen label, and the item's own text is the only source for it.
$effect(() => {
	if (el) select.register(value, el.textContent?.trim() ?? value);
});
</script>

<button
	{...rest}
	bind:this={el}
	type="button"
	role="option"
	data-slot="select-item"
	data-value={value}
	aria-selected={selected}
	{disabled}
	onclick={() => select.commit(value)}
	class={cn(
		UNFOLD_ITEM,
		"flex w-full items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-left text-foreground text-sm outline-none",
		"hover:bg-foreground/[0.06] focus-visible:bg-foreground/[0.06]",
		"disabled:pointer-events-none disabled:opacity-50",
		classProp,
	)}
>
	{@render children?.()}
	{#if selected}
		<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 shrink-0">
			<path d="M3 7.4 5.6 10 11 4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	{/if}
</button>
