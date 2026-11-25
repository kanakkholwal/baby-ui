<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { ShowcaseGrid, type ShowcaseSpan } from "@baby-ui/svelte/showcase-grid";
import type { CardItem } from "#lib/registry.js";
import ShowcasePanel from "./showcase-panel.svelte";

let { items }: { items: CardItem[] } = $props();

type Cell = {
	slug: string;
	span: ShowcaseSpan;
	class?: string;
	props?: Record<string, unknown>;
};

// Six compact panels that read at this height; tall stacks and swipers stay on their own pages.
const CELLS: Cell[] = [
	{ slug: "animated-beam", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "voice-orb", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "notification-stack", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "image-compare", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "github-calendar", span: 7, class: "min-h-85 md:min-h-90" },
	{ slug: "status-monitor", span: 5, class: "min-h-85 md:min-h-90" },
];
</script>

<section aria-labelledby="home-showcase-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 id="home-showcase-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">Live components</h2>
			<p class="mt-2 text-muted-foreground">Real components, not screenshots. Drag, press and type.</p>
		</div>
		<a
			href="/components"
			class="group inline-flex items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			Browse all
			<IconArrowRight
				size={14}
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
	</div>

	<div class="mt-8 rounded-2xl bg-card p-1">
	<ShowcaseGrid class="overflow-hidden rounded-[calc(var(--radius-2xl)-0.25rem)]">
		{#each CELLS as cell (cell.slug)}
			<ShowcasePanel
				slug={cell.slug}
				item={items.find((i) => i.slug === cell.slug)}
				span={cell.span}
				class={cell.class}
				props={cell.props}
			/>
		{/each}
	</ShowcaseGrid>
	</div>
</section>
