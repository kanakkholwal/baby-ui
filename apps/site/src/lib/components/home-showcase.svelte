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

// Six panels chosen for motion worth watching; only the ones resting in view run.
const CELLS: Cell[] = [
	{ slug: "orbit-card-stack", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "voice-orb", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "notification-stack", span: 5, class: "min-h-85 md:min-h-95" },
	{ slug: "image-compare", span: 7, class: "min-h-85 md:min-h-95" },
	{ slug: "card-stack", span: 7, class: "min-h-85 md:min-h-90" },
	{ slug: "prism-orb", span: 5, class: "min-h-85 md:min-h-90" },
];
</script>

<section aria-labelledby="home-showcase-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-col items-center gap-3 text-center">
		<h2 id="home-showcase-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">Live components</h2>
	</div>

	<div class="mt-8 rounded-2xl bg-card p-1 sm:mt-10">
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
