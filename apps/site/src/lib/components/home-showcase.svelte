<script lang="ts">
import { ShowcaseGrid, type ShowcaseSpan } from "@baby-ui/svelte";
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
	<div class="flex flex-col items-center gap-3 text-center">
		<h2 id="home-showcase-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">Live components</h2>
	</div>

	<div class="mt-8 rounded-[1.5rem] bg-card p-2 sm:mt-10">
	<ShowcaseGrid class="overflow-hidden rounded-[calc(1.5rem-0.5rem)]">
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
