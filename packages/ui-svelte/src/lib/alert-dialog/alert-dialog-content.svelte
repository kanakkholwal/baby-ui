<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { getAlertDialog } from "./context";

let { children, class: classProp }: { children?: Snippet; class?: string } = $props();

const dialog = getAlertDialog();
let el = $state<HTMLDialogElement>();

// An alertdialog never dismisses on the backdrop: the choice has to be made.
$effect(() => {
	if (!el) return;
	if (dialog.open && !el.open) el.showModal();
	if (!dialog.open && el.open) el.close();
});
</script>

<dialog
	bind:this={el}
	role="alertdialog"
	aria-labelledby={dialog.titleId}
	aria-describedby={dialog.descriptionId}
	onclose={() => dialog.setOpen(false)}
	oncancel={(event) => {
		event.preventDefault();
		dialog.setOpen(false);
	}}
	class="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		data-slot="alert-dialog-content"
		class={cn(
			"modal-panel w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
			classProp,
		)}
	>
		{@render children?.()}
	</div>
</dialog>
