<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { ANCHORED, stagger } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SURFACE } from "../lib/menu";

let {
	class: classProp,
	ref = $bindable(null),
	...rest
}: ContextMenuPrimitive.ContentProps = $props();

$effect(() => {
	if (ref) stagger(ref.querySelectorAll<HTMLElement>("[role='menuitem']"));
});
</script>

<ContextMenuPrimitive.Portal>
	<ContextMenuPrimitive.Content
		bind:ref
		{...rest}
		data-slot="context-menu-content"
		class={cn(ANCHORED, MENU_SURFACE, classProp)}
	/>
</ContextMenuPrimitive.Portal>
