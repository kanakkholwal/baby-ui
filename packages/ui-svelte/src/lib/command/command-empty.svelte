<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

let {
	children,
	class: classProp,
	...rest
}: {
	children?: Snippet;
	class?: string;
} & HTMLAttributes<HTMLParagraphElement> = $props();
</script>

<!-- :has() hides this whenever the list still has a visible item, so no counting. -->
<p
	{...rest}
	data-slot="command-empty"
	class={cn(
		"px-4 py-10 text-center text-muted-foreground text-sm",
		"[[data-slot=command-list]:has([data-slot=command-item])_&]:hidden",
		classProp,
	)}
>
	{@render children?.()}
</p>
