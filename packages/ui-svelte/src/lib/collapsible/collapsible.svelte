<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	label,
	open = $bindable(false),
	class: classProp,
}: { children: Snippet; label: string; open?: boolean; class?: string } = $props();

const id = $props.id();
</script>

<div class={cn("w-full", classProp)}>
	<button
		type="button"
		aria-expanded={open}
		aria-controls={id}
		onclick={() => (open = !open)}
		class="flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground"
	>
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			style:transform={open ? "rotate(90deg)" : "none"}
			class="size-3.5 shrink-0 text-muted-foreground transition-transform duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
		>
			<path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
		{label}
	</button>

	<div
		{id}
		role="region"
		style:grid-template-rows={open ? "1fr" : "0fr"}
		class="grid transition-[grid-template-rows] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
	>
		<div class="overflow-hidden">
			<div class="px-1 pb-2 text-muted-foreground text-sm">{@render children()}</div>
		</div>
	</div>
</div>
