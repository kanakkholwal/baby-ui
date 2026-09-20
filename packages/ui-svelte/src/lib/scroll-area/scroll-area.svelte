<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	maxHeight = "16rem",
	class: classProp,
}: { children: Snippet; maxHeight?: string; class?: string } = $props();

let viewport = $state<HTMLDivElement>();
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

<div class={cn("relative", classProp)}>
	<div
		bind:this={viewport}
		onscroll={measure}
		style:max-height={maxHeight}
		class="scroll-area overflow-y-auto"
	>
		{@render children()}
	</div>

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
</div>
