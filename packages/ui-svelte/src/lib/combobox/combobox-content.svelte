<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import Command from "../command/command.svelte";
import { cn } from "../lib/cn";
import PopoverContent from "../popover/popover-content.svelte";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();
</script>

<PopoverContent {...rest} class={cn("w-64 overflow-hidden p-0", classProp)}>
	<Command class="max-h-72 rounded-none border-none bg-transparent shadow-none">
		{@render children?.()}
	</Command>
</PopoverContent>
