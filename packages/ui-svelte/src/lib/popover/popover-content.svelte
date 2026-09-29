<script lang="ts">
import { Popover as PopoverPrimitive } from "bits-ui";
import { ANCHORED } from "../lib/anchor";
import { cn } from "../lib/cn";
import { popover } from "./variants";

let {
	class: classProp,
	sideOffset = 4,
	align = "center",
	...rest
}: PopoverPrimitive.ContentProps = $props();
</script>

<PopoverPrimitive.Portal>
	<PopoverPrimitive.Content
		{sideOffset}
		{align}
		{...rest}
		data-slot="popover-content"
		class={cn(ANCHORED, "static", popover().surface(), popover().content(), classProp)}
	/>
</PopoverPrimitive.Portal>
