<script lang="ts">
import type { Snippet } from "svelte";
import { DIALOG_SURFACE } from "../dialog/context";
import { cn } from "../lib/cn";
import { COMMAND_PANEL } from "./context";

let {
	children,
	open = $bindable(false),
	label = "Command palette",
	class: classProp,
}: { children?: Snippet; open?: boolean; label?: string; class?: string } = $props();

let el = $state<HTMLDialogElement>();

$effect(() => {
	if (!el) return;
	if (open && !el.open) el.showModal();
	if (!open && el.open) el.close();
});
</script>

<dialog
	bind:this={el}
	aria-label={label}
	onclose={() => (open = false)}
	oncancel={(event) => {
		event.preventDefault();
		open = false;
	}}
	onclick={(event) => {
		if (event.target === el) open = false;
	}}
	class={cn(
		DIALOG_SURFACE,
		"mx-auto mt-[14vh] mb-auto",
		"backdrop:bg-background/10 backdrop:backdrop-blur-md backdrop:backdrop-saturate-150",
	)}
>
	<div
		data-slot="command-dialog"
		data-state={open ? "open" : "closed"}
		class={cn(
			COMMAND_PANEL,
			"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
</dialog>
