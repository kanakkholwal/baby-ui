<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { getCollapsible } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const collapsible = getCollapsible();
</script>

<button
	{...rest}
	type="button"
	data-slot="collapsible-trigger"
	data-state={collapsible.open ? "open" : "closed"}
	aria-expanded={collapsible.open}
	aria-controls={collapsible.contentId}
	onclick={collapsible.toggle}
	class={cn(
		"flex w-full items-center gap-2 rounded-lg px-1 py-1.5 text-left font-medium text-foreground text-sm transition-colors hover:text-muted-foreground",
		classProp,
	)}
>
	<svg
		viewBox="0 0 16 16"
		fill="none"
		aria-hidden="true"
		style:transform={collapsible.open ? "rotate(90deg)" : "none"}
		class="size-3.5 shrink-0 text-muted-foreground transition-[transform,scale,translate] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none"
	>
		<path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
	{@render children?.()}
</button>
