<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../lib/cn";

let {
	children,
	orientation = "horizontal",
	label = "Toolbar",
	class: classProp,
	...rest
}: Omit<ToolbarPrimitive.RootProps, "orientation"> & {
	orientation?: "horizontal" | "vertical";
	label?: string;
} = $props();
</script>

<ToolbarPrimitive.Root
	{orientation}
	aria-label={label}
	data-slot="toolbar"
	class={cn(
		"inline-flex items-center gap-0.5 rounded-xl border border-border bg-card p-1",
		orientation === "vertical" && "flex-col",
		classProp,
	)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Root>
