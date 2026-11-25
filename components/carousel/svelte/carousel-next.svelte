<script lang="ts">
import type { ComponentProps } from "svelte";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { getCarousel } from "./context";

let {
	class: classProp,
	...rest
}: Omit<ComponentProps<typeof Button>, "variant" | "size"> = $props();

const ctx = getCarousel();
</script>

{#if ctx.count > 1}
	<Button
		{...rest}
		variant="ghost"
		size="icon-sm"
		data-slot="carousel-next"
		aria-label={ctx.labels.next}
		aria-disabled={!ctx.loop && ctx.index === ctx.count - 1}
		class={cn(ctx.s.control(), ctx.s.next(), classProp)}
		onclick={() => ctx.step(1)}
	>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="m6 3.5 4.5 4.5L6 12.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</Button>
{/if}
