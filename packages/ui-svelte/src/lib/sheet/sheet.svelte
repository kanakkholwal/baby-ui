<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	open = $bindable(false),
	side = "right",
	title,
	class: classProp,
}: {
	children?: Snippet;
	open?: boolean;
	side?: "left" | "right" | "top" | "bottom";
	title: string;
	class?: string;
} = $props();

const id = $props.id();
let panel = $state<HTMLDivElement>();

const SIDE = {
	left: "inset-y-0 left-0 h-full w-[min(22rem,100vw)] border-r",
	right: "inset-y-0 right-0 h-full w-[min(22rem,100vw)] border-l",
	top: "inset-x-0 top-0 w-full max-h-[80vh] border-b",
	bottom: "inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-2xl border-t",
};

$effect(() => {
	if (!open) return;
	panel?.querySelector<HTMLElement>("button, a, input, [tabindex]")?.focus();
	const onKey = (e: KeyboardEvent) => {
		if (e.key === "Escape") open = false;
	};
	window.addEventListener("keydown", onKey);
	return () => window.removeEventListener("keydown", onKey);
});
</script>

{#if open}
	<div class="fixed inset-0 z-50">
		<button
			type="button"
			aria-label="Close"
			onclick={() => (open = false)}
			class="absolute inset-0 bg-black/50"
		></button>

		<div
			bind:this={panel}
			role="dialog"
			aria-modal="true"
			aria-labelledby={id}
			data-side={side}
			class={cn(
				"sheet-panel absolute flex flex-col gap-4 overflow-y-auto border-border bg-background p-6",
				SIDE[side],
				classProp,
			)}
		>
			<div class="flex items-center justify-between gap-4">
				<h2 {id} class="font-semibold text-foreground text-sm">{title}</h2>
				<button
					type="button"
					aria-label="Close"
					onclick={() => (open = false)}
					class="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
				>
					<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4">
						<path d="m4 4 8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
					</svg>
				</button>
			</div>
			{@render children?.()}
		</div>
	</div>
{/if}
