<script lang="ts">
import type { Snippet } from "svelte";
import { DIALOG_SURFACE } from "../dialog/context";
import { cn } from "../lib/cn";
import Shortcut from "../shortcut/shortcut.svelte";
import { COMMAND_PANEL, setCommandDialogState } from "./context";

let {
	children,
	open = $bindable(false),
	label = "Command palette",
	class: classProp,
}: { children?: Snippet; open?: boolean; label?: string; class?: string } = $props();

let el = $state<HTMLDialogElement>();
let header = $state<{ children?: Snippet; class?: string }>();

setCommandDialogState({
	get open() {
		return open;
	},
	get header() {
		return header;
	},
	set header(next) {
		header = next;
	},
});

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
			"flex max-h-[min(30rem,70dvh)] w-[min(36rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background p-1 shadow-2xl",
			classProp,
		)}
	>
		<!-- Inset frame: header sits in the rim, the card below it holds input and results. -->
		{#if header}
			<div
				data-slot="command-header"
				class={cn("flex items-center justify-between gap-3 px-3.5 pt-1.5 pb-2", header.class)}
			>
				<p class="font-medium text-foreground text-sm">{@render header.children?.()}</p>
				<span class="flex shrink-0 items-center gap-1.5 text-muted-foreground text-xs">
					<Shortcut shortcut="esc" size="sm" />
					close
				</span>
			</div>
		{/if}
		{@render children?.()}
	</div>
</dialog>
