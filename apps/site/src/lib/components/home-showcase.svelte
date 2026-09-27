<script lang="ts">
import { Button, ShowcaseGrid, type ShowcaseSpan } from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import type { CardItem } from "$lib/registry";
import ShowcasePanel from "./showcase-panel.svelte";

let { items }: { items: CardItem[] } = $props();

type Cell = {
	slug: string;
	span: ShowcaseSpan;
	class?: string;
	props?: Record<string, unknown>;
};

// Six panels, none repeating the hero: few enough to take in at once,
// and only the ones resting in view run.
const CELLS: Cell[] = [
	{ slug: "area-chart", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "text-loop", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "task-rows", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "webgl-liquid", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "circuit-board", span: 5, class: "min-h-85 md:min-h-80" },
	{ slug: "week-calendar", span: 7, class: "min-h-85 md:min-h-80" },
];
</script>

<section aria-labelledby="home-showcase-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-showcase-heading"
		class="font-normal text-[clamp(1.1rem,3.4vw,1.85rem)] text-foreground tracking-[-0.05em] md:whitespace-nowrap"
	>
		Every component, live and ready to explore.
	</h2>

	<ShowcaseGrid class="mt-8 sm:mt-10">
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

	<div class="mt-12 flex justify-center">
		<Button href="/components" variant="outline" size="lg" class="group">
			Browse all components
			<IconArrowRight
				stroke={1.7}
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</Button>
	</div>
</section>
