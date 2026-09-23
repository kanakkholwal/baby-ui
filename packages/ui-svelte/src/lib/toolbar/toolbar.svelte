<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { type ToolbarOrientation, toolbar } from "./variants";

let {
	children,
	orientation = "horizontal",
	label = "Toolbar",
	class: classProp,
	...rest
}: Omit<ToolbarPrimitive.RootProps, "orientation"> & {
	orientation?: ToolbarOrientation;
	label?: string;
} = $props();
</script>

<ToolbarPrimitive.Root
	{orientation}
	aria-label={label}
	data-slot="toolbar"
	class={cn(toolbar({ orientation }).root(), classProp)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Root>
