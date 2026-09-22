<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";

let {
	class: classProp,
	sideOffset = 6,
	align = "start",
	...rest
}: PopoverPrimitive.ContentProps = $props();
</script>

<PopoverPrimitive.Portal>
	<PopoverPrimitive.Content
		{sideOffset}
		{align}
		{...rest}
		data-slot="popover-content"
		class={cn(
			ANCHORED,
			"w-72 rounded-xl border border-border bg-popover p-3 text-sm shadow-2xl",
			classProp,
		)}
	/>
</PopoverPrimitive.Portal>
