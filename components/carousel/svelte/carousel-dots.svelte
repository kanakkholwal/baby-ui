<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { getCarousel } from "./context";

let { class: classProp, ...rest }: { class?: string } & HTMLAttributes<HTMLDivElement> =
	$props();

const ctx = getCarousel();
</script>

<div
	{...rest}
	data-slot="carousel-dots"
	class={cn(ctx.s.tabs(), classProp)}
	role="tablist"
	aria-label={ctx.labels.chooseSlide}
>
	{#if ctx.count > 1}
		{#each { length: ctx.count } as _, i (i)}
			<Button
				variant="ghost"
				size="icon-sm"
				role="tab"
				data-carousel-dot=""
				aria-selected={i === ctx.index}
				aria-controls={ctx.slideId(i)}
				aria-label={ctx.slideLabel(i)}
				tabindex={i === ctx.index ? 0 : -1}
				class={ctx.s.tab()}
				style={`--emphasis: ${i === ctx.startIndex ? 1 : 0}`}
				onclick={() => ctx.go(i)}
			>
				<span class={ctx.s.dot()} aria-hidden="true">
					<span class={ctx.s.dotFill()}></span>
					<span class={ctx.s.dotDrain()}></span>
				</span>
			</Button>
		{/each}
	{/if}
</div>
