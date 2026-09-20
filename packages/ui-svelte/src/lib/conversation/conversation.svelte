<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	empty,
	maxHeight = "24rem",
	class: classProp,
}: { children?: Snippet; empty?: Snippet; maxHeight?: string; class?: string } = $props();

let viewport = $state<HTMLDivElement>();
let pinned = $state(true);

function measure() {
	if (!viewport) return;
	pinned = viewport.scrollTop + viewport.clientHeight >= viewport.scrollHeight - 24;
}

// Follow new turns only while the reader is already at the bottom. Yanking someone
// back down mid-scroll is the most common bug in a chat transcript.
$effect(() => {
	if (!viewport) return;
	const observer = new MutationObserver(() => {
		if (pinned && viewport) viewport.scrollTop = viewport.scrollHeight;
	});
	observer.observe(viewport, { childList: true, subtree: true });
	return () => observer.disconnect();
});

function toBottom() {
	if (!viewport) return;
	viewport.scrollTo({ top: viewport.scrollHeight, behavior: "smooth" });
}
</script>

<div class={cn("relative", classProp)}>
	<div
		bind:this={viewport}
		onscroll={measure}
		style:max-height={maxHeight}
		class="scroll-area flex flex-col gap-4 overflow-y-auto p-1"
	>
		{#if children}
			{@render children()}
		{:else if empty}
			{@render empty()}
		{/if}
	</div>

	{#if !pinned}
		<button
			type="button"
			onclick={toBottom}
			class="anchored absolute inset-x-0 bottom-3 mx-auto grid size-8 place-items-center rounded-full border border-border bg-popover text-muted-foreground shadow-lg transition-colors hover:text-foreground"
			aria-label="Scroll to latest"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
				<path d="M8 3.5V13M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	{/if}
</div>
