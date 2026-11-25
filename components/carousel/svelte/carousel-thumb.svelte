<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { getCarousel, getThumbs } from "./context";

let {
	children,
	class: classProp,
	...rest
}: { children?: Snippet; class?: string } & HTMLButtonAttributes = $props();

const ctx = getCarousel();
const index = getThumbs().register();
</script>

<button
	type="button"
	{...rest}
	data-slot="carousel-thumb"
	aria-current={index === ctx.index}
	aria-controls={ctx.slideId(index)}
	aria-label={ctx.slideLabel(index)}
	class={cn(ctx.s.thumb(), classProp)}
	onclick={() => ctx.go(index)}
>
	{@render children?.()}
</button>
