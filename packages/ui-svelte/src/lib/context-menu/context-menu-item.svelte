<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { menuItem } from "../lib/menu";

let {
	class: classProp,
	destructive = false,
	inset = false,
	...rest
}: ContextMenuPrimitive.ItemProps & { destructive?: boolean; inset?: boolean } = $props();

const variant = $derived(destructive ? "destructive" : "default");
</script>

<ContextMenuPrimitive.Item
	{...rest}
	data-slot="context-menu-item"
	data-inset={inset || undefined}
	class={cn(menuItem({ variant }), classProp)}
/>
