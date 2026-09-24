<script lang="ts">
import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
import { getContext } from "svelte";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { MENU_SURFACE } from "../lib/menu";

let { class: classProp, ...rest }: ContextMenuPrimitive.SubContentProps = $props();

const sub = getContext<{ close: () => void } | undefined>("context-menu-sub");
</script>

<ContextMenuPrimitive.Portal>
	<ContextMenuPrimitive.SubContent
		escapeKeydownBehavior={sub ? "ignore" : "close"}
		onkeydown={(event: KeyboardEvent) => {
			if (event.key !== "Escape" || !sub) return;
			event.stopPropagation();
			const id = (event.currentTarget as HTMLElement).id;
			sub.close();
			document.querySelector<HTMLElement>(`[aria-controls="${id}"]`)?.focus();
		}}
		{...rest}
		data-slot="context-menu-sub-content"
		class={cn(ANCHORED, "static", MENU_SURFACE, "min-w-40", classProp)}
	/>
</ContextMenuPrimitive.Portal>
