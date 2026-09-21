<script lang="ts">
import type { Snippet } from "svelte";
import { DIALOG_PANEL, DIALOG_SURFACE } from "../dialog/context";
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
	class={DIALOG_SURFACE}
>
	<div
		data-slot="alert-dialog-content"
		data-state={dialog.open ? "open" : "closed"}
		class={cn(
			DIALOG_PANEL,
			"w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-border bg-background p-1 shadow-2xl",
			classProp,
		)}
	>
		<div class="relative overflow-hidden rounded-[11px] bg-card p-5">
			{@render children?.()}
		</div>
		{#if dialog.footer}
			<div
				data-slot="alert-dialog-footer"
				class={cn("flex items-center justify-end gap-2 px-2 pt-2 pb-1", dialog.footer.class)}
			>
				{@render dialog.footer.children?.()}
			</div>
		{/if}
	</div>
</dialog>
