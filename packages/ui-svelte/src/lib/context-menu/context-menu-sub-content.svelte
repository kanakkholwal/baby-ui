<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SURFACE } from "../lib/menu";

let { class: classProp, ...rest }: ContextMenuPrimitive.SubContentProps = $props();
</script>

<ContextMenuPrimitive.Portal>
	<ContextMenuPrimitive.SubContent
		{...rest}
		data-slot="context-menu-sub-content"
		class={cn(ANCHORED, MENU_SURFACE, "min-w-40", classProp)}
	/>
</ContextMenuPrimitive.Portal>
