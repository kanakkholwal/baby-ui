<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { menuItem } from "../lib/menu";

let {
	class: classProp,
	children: label,
	closeOnSelect = false,
	...rest
}: Omit<ContextMenuPrimitive.RadioItemProps, "children"> & {
	children?: Snippet;
} = $props();
</script>

<ContextMenuPrimitive.RadioItem
	{closeOnSelect}
	{...rest}
	data-slot="context-menu-radio-item"
	data-inset=""
	class={cn(menuItem({ variant: "default" }), classProp)}
>
	{#snippet children({ checked })}
		<span class="pointer-events-none absolute left-2.5 flex size-3.5 items-center justify-center">
			{#if checked}
				<span class="block size-1.5 rounded-full bg-current"></span>
			{/if}
		</span>
		{@render label?.()}
	{/snippet}
</ContextMenuPrimitive.RadioItem>
