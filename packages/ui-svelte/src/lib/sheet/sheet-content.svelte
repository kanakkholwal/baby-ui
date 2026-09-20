<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { getSheet, SHEET_SIDE, type SheetSide } from "./context";

let {
	children,
	side = "right",
	class: classProp,
}: { children?: Snippet; side?: SheetSide; class?: string } = $props();

const sheet = getSheet();
let panel = $state<HTMLDivElement>();

$effect(() => {
	if (!sheet.open) return;
	panel?.querySelector<HTMLElement>("button, a, input, [tabindex]")?.focus();
	const onKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") sheet.setOpen(false);
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

{#if sheet.open}
	<div class="fixed inset-0 z-50">
		<button
			type="button"
			aria-label="Close"
			onclick={() => sheet.setOpen(false)}
			class="absolute inset-0 bg-black/50"
		></button>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={sheet.titleId}
			data-slot="sheet-content"
			data-side={side}
			class={cn(
				"sheet-panel absolute flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
				SHEET_SIDE[side],
				classProp,
			)}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
