<script lang="ts">
import { ScrollArea as ScrollAreaPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	maxHeight = "16rem",
	class: classProp,
	...rest
}: ScrollAreaPrimitive.RootProps & { children: Snippet; maxHeight?: string } = $props();

let viewport = $state<HTMLDivElement | null>(null);
let atTop = $state(true);
let atBottom = $state(true);

// Fades tell the reader there is more; a styled scrollbar alone does not on touch.
function measure() {
	if (!viewport) return;
	atTop = viewport.scrollTop <= 1;
	atBottom = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 1;
}

$effect(() => {
	if (!viewport) return;
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(viewport);
	return () => observer.disconnect();
});
</script>

<ScrollAreaPrimitive.Root data-slot="scroll-area" class={cn("relative", classProp)} {...rest}>
	<ScrollAreaPrimitive.Viewport
		bind:ref={viewport}
		onscroll={measure}
		data-slot="scroll-area-viewport"
		style="max-height: {maxHeight}"
		class="size-full rounded-[inherit] outline-none"
	>
		{@render children()}
	</ScrollAreaPrimitive.Viewport>
	<ScrollAreaPrimitive.Scrollbar
		data-slot="scroll-area-scrollbar"
		orientation="vertical"
		class="flex touch-none select-none p-0.5 transition-colors data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-2.5"
	>
		<ScrollAreaPrimitive.Thumb
			data-slot="scroll-area-thumb"
			class="relative flex-1 rounded-full bg-border"
		/>
	</ScrollAreaPrimitive.Scrollbar>
	<ScrollAreaPrimitive.Corner />

	<span
		aria-hidden="true"
		style:opacity={atTop ? 0 : 1}
		class="pointer-events-none absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-background to-transparent transition-opacity duration-150"
	></span>
	<span
		aria-hidden="true"
		style:opacity={atBottom ? 0 : 1}
		class="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background to-transparent transition-opacity duration-150"
	></span>
</ScrollAreaPrimitive.Root>
