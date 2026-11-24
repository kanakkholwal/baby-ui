<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { badgeAnchor } from "../variants";

let {
	children,
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLSpanElement>, "class" | "children"> & {
	children?: Snippet;
	class?: string;
} = $props();
</script>

<!-- Wraps the element a corner badge sits on, such as an avatar or an icon button. -->
<span data-slot="badge-anchor" class={cn(badgeAnchor(), classProp)} {...rest}>
	{@render children?.()}
</span>
