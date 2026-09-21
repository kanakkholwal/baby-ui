<script lang="ts">
import type { Snippet } from "svelte";
import { DIALOG_PANEL, DIALOG_SURFACE } from "../dialog/context";
import { dialogFrame } from "../dialog/variants";
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
		data-variant={dialog.variant}
		class={cn(
			DIALOG_PANEL,
			dialogFrame({ variant: dialog.variant }).panel(),
			"w-[min(26rem,calc(100vw-2rem))]",
			classProp,
		)}
	>
		{#if dialog.variant === "framed"}
			<div class={cn(dialogFrame({ variant: dialog.variant }).body(), "p-5")}>
				{@render children?.()}
			</div>
			{#if dialog.footer}
				<div
					data-slot="alert-dialog-footer"
					class={cn(dialogFrame({ variant: dialog.variant }).footer(), dialog.footer.class)}
				>
					{@render dialog.footer.children?.()}
				</div>
			{/if}
		{:else}
			{@render children?.()}
			{#if dialog.footer}
				<div
					data-slot="alert-dialog-footer"
					class={cn(dialogFrame({ variant: dialog.variant }).footer(), dialog.footer.class)}
				>
					{@render dialog.footer.children?.()}
				</div>
			{/if}
		{/if}
	</div>
</dialog>
