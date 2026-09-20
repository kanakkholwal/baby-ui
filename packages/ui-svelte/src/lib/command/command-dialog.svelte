<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

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
	class="command-dialog mx-auto mt-[12vh] mb-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		data-slot="command-dialog"
		class={cn(
			"flex max-h-[min(30rem,70dvh)] w-[min(34rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
</dialog>
