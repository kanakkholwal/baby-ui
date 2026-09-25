<script lang="ts">
import { Button, ShowcaseGrid, type ShowcaseSpan } from "@baby-ui/svelte";
import IconArrowRight from "@tabler/icons-svelte/icons/arrow-right";
import ShowcasePanel from "./showcase-panel.svelte";

type Cell = { slug: string; span: ShowcaseSpan; class?: string };

const CELLS: Cell[] = [
	{ slug: "dia-text", span: 7, class: "md:min-h-70" },
	{ slug: "rolling-digits", span: 5, class: "md:min-h-70" },
	{ slug: "area-chart", span: 7, class: "min-h-85 md:min-h-100" },
	{ slug: "message", span: 5, class: "min-h-85 md:min-h-100" },
	{ slug: "reasoning", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "thinking-state", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "bar-chart", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "streaming-text", span: 5, class: "md:min-h-95" },
	{ slug: "week-calendar", span: 12, class: "md:min-h-80" },
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
			<ShowcasePanel slug={cell.slug} span={cell.span} class={cell.class} />
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
