<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { DIALOG_PANEL, DIALOG_SURFACE, getDialog } from "./context";
import { dialogFrame, dialogWidth } from "./variants";

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
	class={DIALOG_SURFACE}
>
	<div
		data-slot="dialog-content"
		data-state={dialog.open ? "open" : "closed"}
		data-variant={dialog.variant}
		class={cn(
			DIALOG_PANEL,
			dialogFrame({ variant: dialog.variant }).panel(),
			"w-[min(32rem,calc(100vw-2rem))]",
			dialogWidth({ size: dialog.size }),
			classProp,
		)}
	>
		{#if dialog.variant === "framed"}
			<!-- Inset frame: the body sits on a lighter surface, the footer in the rim below it. -->
			<div class={cn(dialogFrame({ variant: dialog.variant }).body(), "p-5")}>
				{@render children?.()}
			</div>
			{#if dialog.footer}
				<div
					data-slot="dialog-footer"
					class={cn(dialogFrame({ variant: dialog.variant }).footer(), dialog.footer.class)}
				>
					{@render dialog.footer.children?.()}
				</div>
			{/if}
		{:else}
			{@render children?.()}
			{#if dialog.footer}
				<div
					data-slot="dialog-footer"
					class={cn(dialogFrame({ variant: dialog.variant }).footer(), dialog.footer.class)}
				>
					{@render dialog.footer.children?.()}
				</div>
			{/if}
		{/if}
	</div>
</dialog>
