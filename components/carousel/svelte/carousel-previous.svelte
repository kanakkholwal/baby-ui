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
		data-slot="carousel-previous"
		aria-label={ctx.labels.previous}
		aria-disabled={!ctx.loop && ctx.index === 0}
		class={cn(ctx.s.control(), ctx.s.previous(), classProp)}
		onclick={() => ctx.step(-1)}
	>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
			<path d="M10 3.5 5.5 8l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</Button>
{/if}
