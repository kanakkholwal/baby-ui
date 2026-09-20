<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { DIALOG_WIDTH, getDialog } from "./context";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const dialog = getDialog();
let el = $state<HTMLDialogElement>();

// <dialog> owns the top layer and page inertness; syncing is all we do here.
$effect(() => {
	if (!el) return;
	if (dialog.open && !el.open) el.showModal();
	if (!dialog.open && el.open) el.close();
});
</script>

<dialog
	bind:this={el}
	aria-labelledby={dialog.titleId}
	aria-describedby={dialog.descriptionId}
	onclose={() => dialog.setOpen(false)}
	oncancel={(event) => {
		event.preventDefault();
		dialog.setOpen(false);
	}}
	onclick={(event) => {
		if (dialog.dismissOnBackdrop && event.target === el) dialog.setOpen(false);
	}}
	class="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		data-slot="dialog-content"
		class={cn(
			"modal-panel w-[min(32rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
			DIALOG_WIDTH[dialog.size],
			classProp,
		)}
	>
		{@render children?.()}
	</div>
</dialog>
