<script lang="ts">
import { cn } from "../lib/cn";

type Item = { href?: string; label: string };

let {
	items,
	maxVisible = 4,
	class: classProp,
}: { items: Item[]; maxVisible?: number; class?: string } = $props();

// Keep the root and the last two; the middle is what a long trail can afford to lose.
const shown = $derived.by(() => {
	if (items.length <= maxVisible) return items.map((item) => ({ item, gap: false }));
	const head = items.slice(0, 1);
	const tail = items.slice(-2);
	return [
		...head.map((item) => ({ item, gap: false })),
		{ item: { label: "\u2026" }, gap: true },
		...tail.map((item) => ({ item, gap: false })),
	];
});
</script>

<nav aria-label="Breadcrumb" class={cn("text-sm", classProp)}>
	<ol class="flex flex-wrap items-center gap-1.5">
		{#each shown as entry, i (entry.item.label + i)}
			<li class="flex items-center gap-1.5">
				{#if entry.gap}
					<span class="px-0.5 text-muted-foreground">{entry.item.label}</span>
				{:else if i === shown.length - 1}
					<span aria-current="page" class="font-medium text-foreground">
						{entry.item.label}
					</span>
				{:else if entry.item.href}
					<a
						href={entry.item.href}
						class="text-muted-foreground transition-colors hover:text-foreground"
					>
						{entry.item.label}
					</a>
				{:else}
					<span class="text-muted-foreground">{entry.item.label}</span>
				{/if}

				{#if i < shown.length - 1}
					<svg viewBox="0 0 14 14" fill="none" aria-hidden="true" class="size-3.5 text-muted-foreground">
						<path d="M5.5 3.5 9 7l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
					</svg>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
