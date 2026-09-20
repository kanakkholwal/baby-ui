<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	footer,
	open = $bindable(false),
	title,
	description,
	size = "md",
	dismissOnBackdrop = true,
	class: classProp,
}: {
	children?: Snippet;
	footer?: Snippet;
	open?: boolean;
	title: string;
	description?: string;
	size?: "sm" | "md" | "lg" | "xl";
	dismissOnBackdrop?: boolean;
	class?: string;
} = $props();

const id = $props.id();
const WIDTH = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", xl: "max-w-4xl" };

let dialog = $state<HTMLDialogElement>();

// <dialog> owns the top layer and page inertness; syncing is all we do here.
$effect(() => {
	if (!dialog) return;
	if (open && !dialog.open) dialog.showModal();
	if (!open && dialog.open) dialog.close();
});
</script>

<dialog
	bind:this={dialog}
	aria-labelledby={id}
	onclose={() => (open = false)}
	oncancel={(e) => {
		e.preventDefault();
		open = false;
	}}
	onclick={(e) => {
		if (dismissOnBackdrop && e.target === dialog) open = false;
	}}
	class="modal-dialog m-auto bg-transparent p-0 text-foreground backdrop:bg-black/50"
>
	<div
		class={cn(
			"modal-panel w-[min(var(--modal-w,32rem),calc(100vw-2rem))] rounded-2xl border border-border bg-card p-6 shadow-2xl",
			WIDTH[size],
			classProp,
		)}
	>
		<div class="flex items-start justify-between gap-4">
			<div class="min-w-0">
				<h2 {id} class="font-medium text-foreground text-lg">{title}</h2>
				{#if description}
					<p class="mt-1 text-muted-foreground text-sm">{description}</p>
				{/if}
			</div>
			<button
				type="button"
				aria-label="Close"
				onclick={() => (open = false)}
				class="-mr-1 shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
					<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
				</svg>
			</button>
		</div>

		{#if children}
			<div class="mt-4 text-muted-foreground text-sm">{@render children()}</div>
		{/if}
		{#if footer}
			<div class="mt-6 flex items-center justify-end gap-2">{@render footer()}</div>
		{/if}
	</div>
</dialog>
