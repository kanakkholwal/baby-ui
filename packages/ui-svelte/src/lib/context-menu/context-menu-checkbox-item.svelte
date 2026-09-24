<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { menuItem } from "../lib/menu";

let {
	class: classProp,
	checked = $bindable(false),
	children: label,
	closeOnSelect = false,
	...rest
}: Omit<ContextMenuPrimitive.CheckboxItemProps, "children"> & {
	children?: Snippet;
} = $props();
</script>

<ContextMenuPrimitive.CheckboxItem
	bind:checked
	{closeOnSelect}
	{...rest}
	data-slot="context-menu-checkbox-item"
	data-inset=""
	class={cn(menuItem({ variant: "default" }), classProp)}
>
	{#snippet children({ checked: on })}
		<span class="pointer-events-none absolute left-2.5 flex size-3.5 items-center justify-center">
			{#if on}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
					<path
						d="m3.5 8.5 3 3 6-7"
						stroke="currentColor"
						stroke-width="1.6"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</span>
		{@render label?.()}
	{/snippet}
</ContextMenuPrimitive.CheckboxItem>
