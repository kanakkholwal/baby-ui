<script lang="ts">
import { cn } from "../lib/cn";

let {
	page = $bindable(1),
	total,
	siblings = 1,
	class: classProp,
}: { page?: number; total: number; siblings?: number; class?: string } = $props();

// First and last always shown; the window follows the current page.
const pages = $derived.by(() => {
	const out: (number | "gap")[] = [];
	const from = Math.max(2, page - siblings);
	const to = Math.min(total - 1, page + siblings);
	out.push(1);
	if (from > 2) out.push("gap");
	for (let i = from; i <= to; i++) out.push(i);
	if (to < total - 1) out.push("gap");
	if (total > 1) out.push(total);
	return out;
});

const arrow =
	"grid size-8 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40";
</script>

<nav aria-label="Pagination" class={cn("flex items-center gap-1", classProp)}>
	<button
		type="button"
		aria-label="Previous page"
		disabled={page <= 1}
		onclick={() => (page = Math.max(1, page - 1))}
		class={arrow}
	>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
			<path d="M10 4 6 8l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>

	{#each pages as entry, i (typeof entry === "number" ? entry : `gap-${i}`)}
		{#if entry === "gap"}
			<span class="px-1 text-muted-foreground text-sm">…</span>
		{:else}
			<button
				type="button"
				aria-current={entry === page ? "page" : undefined}
				onclick={() => (page = entry)}
				class="grid size-8 place-items-center rounded-lg text-muted-foreground text-sm tabular-nums transition-colors hover:text-foreground aria-[current=page]:bg-foreground/[0.08] aria-[current=page]:font-medium aria-[current=page]:text-foreground"
			>
				{entry}
			</button>
		{/if}
	{/each}

	<button
		type="button"
		aria-label="Next page"
		disabled={page >= total}
		onclick={() => (page = Math.min(total, page + 1))}
		class={arrow}
	>
		<svg viewBox="0 0 16 16" fill="none" aria-hidden="true" class="size-3.5">
			<path d="m6 4 4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</button>
</nav>
