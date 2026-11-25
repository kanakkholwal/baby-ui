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
let viewport = $state<HTMLDivElement>();
let track = $state<HTMLDivElement>();

$effect(() => {
	if (viewport && track) ctx.attach(viewport, track);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -- the slide group takes focus so arrow keys move the track -->
<div
	{...rest}
	bind:this={viewport}
	data-slot="carousel-content"
	role="group"
	aria-label={ctx.labels.slides}
	tabindex="0"
	data-dragging={ctx.dragging || undefined}
	class={cn(ctx.s.content(), classProp)}
	onpointerenter={(event) => {
		if (event.pointerType === "mouse") ctx.setHovered(true);
	}}
	onpointerleave={() => ctx.setHovered(false)}
>
	<div bind:this={track} class={ctx.s.track()}>
		{@render children?.()}
	</div>
</div>
