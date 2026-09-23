<script lang="ts">
import { Toolbar as ToolbarPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { toolbar } from "./variants";

let { children, class: classProp, ...rest }: ToolbarPrimitive.ButtonProps = $props();
</script>

<ToolbarPrimitive.Button
	data-slot="toolbar-button"
	class={cn(toolbar().button(), classProp)}
	{...rest}
>
	{@render children?.()}
</ToolbarPrimitive.Button>
