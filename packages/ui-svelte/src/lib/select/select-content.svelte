<script lang="ts">
import { Select as SelectPrimitive } from "bits-ui";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { menu } from "../lib/menu";
import { type SelectContentSize, selectContent } from "./variants";

let {
	class: classProp,
	children,
	sideOffset = 6,
	size,
	...rest
}: SelectPrimitive.ContentProps & {
	/** Match the trigger's `size`. */
	size?: SelectContentSize;
} = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		{sideOffset}
		{...rest}
		data-slot="select-content"
		data-size={size}
		class={cn(
			ANCHORED,
			menu().surface(),
			// After the surface: a select matches its trigger, never the menus' min width.
			"static z-50 max-h-[min(16rem,var(--bits-select-content-available-height))] w-[var(--bits-select-anchor-width)] min-w-0 overflow-x-hidden overflow-y-auto scroll-area",
			selectContent({ size }),
			classProp,
		)}
	>
		<SelectPrimitive.Viewport>
			{@render children?.()}
		</SelectPrimitive.Viewport>
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>
