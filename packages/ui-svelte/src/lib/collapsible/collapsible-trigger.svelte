<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } = $props();
</script>

<CollapsiblePrimitive.Trigger
	{...rest}
	data-slot="collapsible-trigger"
	class={cn(
		"flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground",
		"[&>svg]:transition-[transform,scale,translate] [&>svg]:duration-200 [&>svg]:ease-[var(--ease-out)] [&[data-state=open]>svg]:rotate-90 motion-reduce:[&>svg]:transition-none",
		classProp,
	)}
>
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5 shrink-0 text-muted-foreground">
		<path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
	{@render children?.()}
</CollapsiblePrimitive.Trigger>
