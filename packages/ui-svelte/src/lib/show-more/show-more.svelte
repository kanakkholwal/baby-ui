<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	lines = 3,
	maxHeight = 320,
	expanded = $bindable(false),
	moreLabel = "Show more",
	lessLabel = "Show less",
	label = "Details",
	class: classProp,
}: {
	children: Snippet;
	lines?: number;
	maxHeight?: number;
	expanded?: boolean;
	moreLabel?: string;
	lessLabel?: string;
	label?: string;
	class?: string;
} = $props();

const uid = $props.id();
let content = $state<HTMLDivElement>();
let region = $state<HTMLDivElement>();
let lineHeight = $state<number>();
let fullHeight = $state<number>();

const collapsedHeight = $derived(
	lineHeight === undefined || fullHeight === undefined
		? undefined
		: Math.min(lineHeight * lines, fullHeight),
);
const expandable = $derived(
	lineHeight === undefined || fullHeight === undefined
		? false
		: fullHeight - lineHeight * lines > 1,
);
const open = $derived(expanded && expandable);
const scrollable = $derived(open && fullHeight !== undefined && fullHeight > maxHeight);
const height = $derived(
	open
		? fullHeight === undefined
			? undefined
			: Math.min(fullHeight, maxHeight)
		: collapsedHeight,
);
const veiled = $derived(expandable && (!open || scrollable));

$effect(() => {
	if (!content) return;
	const measure = () => {
		if (!content) return;
		const styles = getComputedStyle(content);
		const parsed = Number.parseFloat(styles.lineHeight);
		lineHeight = Number.isFinite(parsed)
			? parsed
			: Number.parseFloat(styles.fontSize) * 1.5;
		fullHeight = content.scrollHeight;
	};
	measure();
	const observer = new ResizeObserver(measure);
	observer.observe(content);
	return () => observer.disconnect();
});

function toggle() {
	if (open) region?.scrollTo({ top: 0 });
	expanded = !expanded;
}
</script>

<div class={cn("w-full text-foreground", classProp)}>
	<div class="relative">
		<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
		<div
			bind:this={region}
			id="{uid}-region"
			role={scrollable ? "region" : undefined}
			aria-label={scrollable ? label : undefined}
			tabindex={scrollable ? 0 : undefined}
			style:height={height === undefined ? undefined : `${height}px`}
			style:max-height={height === undefined ? `${lines}lh` : undefined}
			style:overflow-y={scrollable ? "auto" : "hidden"}
			style:scrollbar-gutter={scrollable ? "stable" : undefined}
			class="show-more-region scroll-area overscroll-contain rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			<div bind:this={content}>{@render children()}</div>
		</div>
		<div aria-hidden="true" data-on={veiled} class="show-more-veil"></div>
	</div>

	{#if expandable}
		<button
			type="button"
			onclick={toggle}
			aria-expanded={open}
			aria-controls="{uid}-region"
			class="-ml-2 mt-2 inline-flex h-8 items-center gap-1.5 rounded-md px-2 font-medium text-muted-foreground text-sm transition-colors hover:bg-foreground/[0.06] hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
		>
			{open ? lessLabel : moreLabel}
			<svg
				viewBox="0 0 12 12"
				fill="none"
				aria-hidden="true"
				data-on={open}
				class="show-more-chevron size-3"
			>
				<path d="m2.5 4.25 3.5 3.5 3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>
	{/if}
</div>
