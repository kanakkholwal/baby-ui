<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { ANCHORED, rove } from "../lib/anchor";
import { cn } from "../lib/cn";
import { getSelect } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const select = getSelect();
let el = $state<HTMLDivElement>();
let index = $state(0);

$effect(() => {
	select.setContent(el);
	return () => select.setContent(undefined);
});

function rows() {
	return [
		...(el?.querySelectorAll<HTMLElement>("[role='option']:not([disabled])") ?? []),
	];
}

$effect(() => {
	if (!select.open) return;
	const all = rows();
	index = Math.max(
		0,
		all.findIndex((row) => row.dataset.value === select.value),
	);
	all[index]?.focus();
});

function onkeydown(event: KeyboardEvent) {
	const all = rows();
	const next = rove(all, index, event.key);
	if (next === null) return;
	event.preventDefault();
	index = next;
	all[next]?.focus();
}
</script>

<!-- Never unmounted: items register their label on mount, and the trigger has to echo
     the current one before the list has ever been opened. -->
<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<div
	{...rest}
	bind:this={el}
	id={select.contentId}
	role="listbox"
	tabindex="-1"
	data-slot="select-content"
	data-state={select.open ? "open" : "closed"}
	inert={!select.open}
	{onkeydown}
	style:max-height="min(16rem, var(--anchor-available-height, 16rem))"
	class={cn(
		ANCHORED,
		"scroll-area overflow-y-auto rounded-xl border border-border bg-popover p-1 shadow-2xl",
		classProp,
	)}
>
	{@render children?.()}
</div>
