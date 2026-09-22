<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import PopoverTrigger from "../popover/popover-trigger.svelte";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();
</script>

<PopoverTrigger
	{...rest}
	role="combobox"
	class={cn(
		"h-9 w-64 items-center justify-between gap-2 rounded-lg border border-input bg-background px-3 font-normal text-foreground text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
		classProp,
	)}
>
	{@render children?.()}
</PopoverTrigger>
