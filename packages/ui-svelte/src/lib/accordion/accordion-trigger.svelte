<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getAccordion, getAccordionItem } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const accordion = getAccordion();
const item = getAccordionItem();
</script>

<!-- shadcn wraps the button in a heading, so the panel list reads as sections. -->
<h3 data-slot="accordion-header" class="flex">
	<button
		{...rest}
		id={item.triggerId}
		type="button"
		data-slot="accordion-trigger"
		data-state={item.open ? "open" : "closed"}
		aria-expanded={item.open}
		aria-controls={item.contentId}
		disabled={item.disabled}
		onclick={() => accordion.toggle(item.value)}
		class={cn(
			"flex flex-1 items-center justify-between gap-4 px-4 py-3 text-left font-medium text-foreground text-sm outline-none transition-colors hover:bg-foreground/[0.03] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50",
			"[&>svg]:transition-[transform,scale,translate] [&>svg]:duration-[var(--duration-dropdown)] [&>svg]:ease-[var(--ease-out)] [&[data-state=open]>svg]:rotate-180 motion-reduce:[&>svg]:transition-none",
			classProp,
		)}
	>
		{@render children?.()}
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-4 shrink-0 text-muted-foreground">
			<path d="m4 6 4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>
</h3>
