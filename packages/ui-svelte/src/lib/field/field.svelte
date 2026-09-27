<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";
import { type FieldOrientation, field } from "./variants";

let {
	ref = $bindable(null),
	class: classProp,
	orientation = "vertical",
	children,
	...rest
}: HTMLAttributes<HTMLDivElement> & {
	ref?: HTMLDivElement | null;
	orientation?: FieldOrientation;
} = $props();
</script>

<div
	bind:this={ref}
	role="group"
	data-slot="field"
	data-orientation={orientation}
	class={cn(field({ orientation }).root(), classProp)}
	{...rest}
>
	{@render children?.()}
</div>
