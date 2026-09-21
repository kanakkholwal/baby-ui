<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { COMMAND_MARKER, getCommand } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const command = getCommand();
let el = $state<HTMLDivElement>();
let box = $state<{ x: number; y: number; w: number; h: number }>();

$effect(() => {
	command.setList(el);
	return () => command.setList(undefined);
});

$effect(() => {
	const row = command.activeId
		? el?.querySelector<HTMLElement>(`#${CSS.escape(command.activeId)}`)
		: null;
	box = row
		? { x: row.offsetLeft, y: row.offsetTop, w: row.offsetWidth, h: row.offsetHeight }
		: undefined;
});

// Query changes hide and show items synchronously, so the DOM is settled by the time
// this effect's own dependency (query) has flushed.
$effect(() => {
	void command.query;
	command.setResultCount(el?.querySelectorAll("[role='option']").length ?? 0);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_to_interactive_role -->
<div
	{...rest}
	bind:this={el}
	id={command.listId}
	role="listbox"
	data-slot="command-list"
	class={cn(
		"scroll-area relative min-h-0 flex-1 overflow-y-auto overscroll-contain py-1.5",
		classProp,
	)}
>
	{#if box}
		<span
			aria-hidden="true"
			class={COMMAND_MARKER}
			style:translate="{box.x}px {box.y}px"
			style:width="{box.w}px"
			style:height="{box.h}px"
		></span>
	{/if}
	{@render children?.()}
</div>
