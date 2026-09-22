<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../lib/cn";

let { children, class: classProp, ...rest }: ToolbarPrimitive.ButtonProps = $props();
</script>

<ToolbarPrimitive.Button
	data-slot="toolbar-button"
	class={cn(
		"grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
		classProp,
	)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Button>
