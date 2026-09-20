<script lang="ts">
import { cn } from "../lib/cn";

let {
	open = $bindable(false),
	title,
	description,
	confirmLabel = "Confirm",
	cancelLabel = "Cancel",
	destructive = false,
	class: classProp,
	onconfirm,
}: {
	open?: boolean;
	title: string;
	description: string;
	confirmLabel?: string;
	cancelLabel?: string;
	destructive?: boolean;
	class?: string;
	onconfirm?: () => void;
} = $props();

const uid = $props.id();
const titleId = `${uid}-title`;
const descId = `${uid}-desc`;
let dialog = $state<HTMLDialogElement>();
let cancelEl = $state<HTMLButtonElement>();

$effect(() => {
	if (!dialog) return;
	if (open && !dialog.open) {
		dialog.showModal();
		// Focus the safe choice, never the destructive one.
		cancelEl?.focus();
	}
	if (!open && dialog.open) dialog.close();
});
</script>

<dialog
	bind:this={dialog}
	role="alertdialog"
	aria-labelledby={titleId}
	aria-describedby={descId}
	onclose={() => (open = false)}
	oncancel={(e) => {
		e.preventDefault();
		open = false;
	}}
	class="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		class={cn(
			"modal-panel w-[min(26rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
			classProp,
		)}
	>
		<h2 id={titleId} class="font-medium text-foreground text-base">{title}</h2>
		<p id={descId} class="mt-2 text-muted-foreground text-sm leading-relaxed">{description}</p>

		<div class="mt-6 flex items-center justify-end gap-2">
			<button
				bind:this={cancelEl}
				type="button"
				onclick={() => (open = false)}
				class="inline-flex h-9 items-center rounded-lg border border-border px-3 font-medium text-foreground text-sm transition-colors hover:bg-foreground/[0.06]"
			>
				{cancelLabel}
			</button>
			<button
				type="button"
				onclick={() => {
					onconfirm?.();
					open = false;
				}}
				class={cn(
					"inline-flex h-9 items-center rounded-lg px-3 font-medium text-sm transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] active:scale-[var(--press-scale)]",
					destructive
						? "bg-[var(--destructive)] text-white"
						: "bg-primary text-primary-foreground",
				)}
			>
				{confirmLabel}
			</button>
		</div>
	</div>
</dialog>
