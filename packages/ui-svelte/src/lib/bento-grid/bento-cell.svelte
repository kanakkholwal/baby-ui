<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

export type BentoSpan = "1x1" | "2x1" | "1x2" | "2x2";

type Props = {
	children?: Snippet;
	class?: string;
	span?: BentoSpan;
	title?: string;
	description?: string;
};

let { children, class: classProp, span = "1x1", title, description }: Props = $props();

/** Spans only apply from `md` up; below it every cell is one column wide. */
const SPAN: Record<BentoSpan, string> = {
	"1x1": "",
	"2x1": "md:col-span-2",
	"1x2": "md:row-span-2",
	"2x2": "md:col-span-2 md:row-span-2",
};
</script>

<div
	class={cn(
		"group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5",
		"transition-[transform,scale,translate,border-color] duration-200 ease-[var(--ease-out)]",
		"hover:-translate-y-0.5 hover:border-ring motion-reduce:hover:translate-y-0",
		SPAN[span],
		classProp,
	)}
>
	{#if title}<h3 class="font-medium text-foreground text-sm">{title}</h3>{/if}
	{#if description}
		<p class="mt-1 text-muted-foreground text-xs leading-relaxed">{description}</p>
	{/if}
	<div class="min-h-0 flex-1">{@render children?.()}</div>
</div>
