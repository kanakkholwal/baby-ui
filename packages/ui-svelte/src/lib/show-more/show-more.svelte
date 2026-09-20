<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	collapsedHeight = 120,
	moreLabel = "Show more",
	lessLabel = "Show less",
	class: classProp,
}: {
	children: Snippet;
	collapsedHeight?: number;
	moreLabel?: string;
	lessLabel?: string;
	class?: string;
} = $props();

const id = $props.id();
let open = $state(false);
let content = $state<HTMLDivElement>();
let overflows = $state(false);

// Only offer the control when the content actually exceeds the collapsed height.
$effect(() => {
	if (!content) return;
	const measure = () => {
		overflows = content !== undefined && content.scrollHeight > collapsedHeight + 8;
	};
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(content);
	return () => observer.disconnect();
});
</script>

<div class={cn("w-full", classProp)}>
	<div
		{id}
		bind:this={content}
		style:max-height={open || !overflows ? "none" : `${collapsedHeight}px`}
		class={cn(
			"relative overflow-hidden text-muted-foreground text-sm",
			!open && overflows && "show-more-fade",
		)}
	>
		{@render children()}
	</div>

	{#if overflows}
		<button
			type="button"
			aria-expanded={open}
			aria-controls={id}
			onclick={() => (open = !open)}
			class="mt-2 font-medium text-foreground text-sm underline underline-offset-4 transition-colors hover:text-muted-foreground"
		>
			{open ? lessLabel : moreLabel}
		</button>
	{/if}
</div>
