<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	thinking = false,
	duration = 0,
	defaultOpen = false,
	class: classProp,
}: {
	children?: Snippet;
	thinking?: boolean;
	duration?: number;
	defaultOpen?: boolean;
	class?: string;
} = $props();

const id = $props.id();
let touched = $state(false);
let manual = $state(untrack(() => defaultOpen));

// Auto-open while thinking, auto-close when it ends, unless the reader has chosen.
const open = $derived(touched ? manual : thinking || defaultOpen);
</script>

<div class={cn("overflow-hidden rounded-xl border border-border bg-card/40", classProp)}>
	<button
		type="button"
		aria-expanded={open}
		aria-controls={id}
		onclick={() => {
			touched = true;
			manual = !open;
		}}
		class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.03]"
	>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
			<path d="M8 1.8a4.2 4.2 0 0 0-2.4 7.6c.4.3.6.7.6 1.2v.3h3.6v-.3c0-.5.2-.9.6-1.2A4.2 4.2 0 0 0 8 1.8Z" stroke="currentColor" stroke-width="1.2" />
			<path d="M6.4 13.4h3.2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" />
		</svg>
		<span class={cn("flex-1 font-medium", thinking ? "reasoning-shimmer" : "text-muted-foreground")}>
			{thinking ? "Thinking" : `Thought for ${duration}s`}
		</span>
		<svg
			viewBox="0 0 16 16"
			fill="none"
			aria-hidden="true"
			style:transform={open ? "rotate(180deg)" : "none"}
			class="size-3.5 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
		>
			<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>

	<div
		{id}
		role="region"
		style:grid-template-rows={open ? "1fr" : "0fr"}
		class="grid transition-[grid-template-rows] duration-[var(--duration-dropdown)] ease-[var(--ease-out)] motion-reduce:transition-none"
	>
		<div class="overflow-hidden">
			<div class="border-border/60 border-t px-3 py-2.5 text-muted-foreground text-xs leading-relaxed">
				{@render children?.()}
			</div>
		</div>
	</div>
</div>
