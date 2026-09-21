<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { getSheet, SHEET_OVERLAY, SHEET_VEIL, type SheetSide } from "./context";
import { sheetPanel } from "./variants";

let {
	children,
	side = "right",
	class: classProp,
}: { children?: Snippet; side?: SheetSide; class?: string } = $props();

const sheet = getSheet();
let panel = $state<HTMLDivElement>();
// Nothing renders until the first open, and from then on the panel stays so it can slide out.
let mounted = $state(false);

$effect(() => {
	if (!sheet.open) return;
	mounted = true;
	panel?.querySelector<HTMLElement>("button, a, input, [tabindex]")?.focus();
	const onKey = (event: KeyboardEvent) => {
		if (event.key === "Escape") sheet.setOpen(false);
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

{#if mounted}
	<div class={SHEET_OVERLAY} data-state={sheet.open ? "open" : "closed"} inert={!sheet.open}>
		<button
			type="button"
			aria-label="Close"
			data-state={sheet.open ? "open" : "closed"}
			onclick={() => sheet.setOpen(false)}
			class={SHEET_VEIL}
		></button>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={sheet.titleId}
			data-slot="sheet-content"
			data-side={side}
			data-state={sheet.open ? "open" : "closed"}
			class={cn(sheetPanel({ side }), classProp)}
		>
			{@render children?.()}
		</div>
	</div>
{/if}
