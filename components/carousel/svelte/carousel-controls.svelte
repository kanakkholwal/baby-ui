<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { getCarousel } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLAttributes<HTMLDivElement> = $props();

const ctx = getCarousel();
</script>

<div {...rest} data-slot="carousel-controls" class={cn(ctx.s.controls(), classProp)}>
	{@render children?.()}
</div>
