<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { ShowcaseGrid } from "@baby-ui/svelte";
import type { CardItem, NavCategory } from "#lib/registry.js";
import ShowcasePanel from "./showcase-panel.svelte";

let {
	items,
	categories,
	emailHtml,
}: { items: CardItem[]; categories: NavCategory[]; emailHtml?: string } = $props();

type Tile = { category: string; slug?: string; title: string; text: string };

// The four areas most libraries leave out, each shown running rather than described.
const TILES: Tile[] = [
	{
		category: "agents",
		slug: "approval-gate",
		title: "Agent UI",
		text: "Approvals, tool calls, plans and chat.",
	},
	{
		category: "charts",
		slug: "area-chart",
		title: "Charts",
		text: "d3 and SVG, keyboard navigable.",
	},
	{
		category: "emails",
		title: "Emails",
		text: "Transactional templates for React Email and Svelte.",
	},
	{
		category: "og-images",
		slug: "og-product-launch",
		title: "OG images",
		text: "1200 × 630 cards rendered to PNG.",
	},
];

const hrefOf = (category: string) =>
	categories.find((c) => c.category === category)?.href ?? "/components";
const countOf = (category: string) =>
	categories.find((c) => c.category === category)?.count;
</script>

<section aria-labelledby="home-breadth-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-breadth-heading"
		class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
	>
		Not just buttons and inputs
	</h2>
	<div class="mt-8 grid gap-3 md:grid-cols-2">
		{#each TILES as tile (tile.category)}
			<article class="flex min-w-0 flex-col rounded-2xl bg-card p-1">
				<a
					href={hrefOf(tile.category)}
					class="group flex items-start justify-between gap-4 rounded-xl px-4 pt-3 pb-3 outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<span class="flex flex-col gap-0.5">
						<span class="font-medium text-foreground">
							{tile.title}
							{#if countOf(tile.category)}<span class="ml-1 text-muted-foreground tabular-nums">{countOf(tile.category)}</span>{/if}
						</span>
						<span class="text-muted-foreground text-sm">{tile.text}</span>
					</span>
					<IconArrowRight
						size={16}
						aria-hidden="true"
						class="mt-1 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
					/>
				</a>
				<div class="relative h-80 overflow-hidden rounded-[calc(var(--radius-2xl)-0.25rem)] bg-background">
					{#if tile.slug}
						<ShowcaseGrid class="h-full">
							<ShowcasePanel
								slug={tile.slug}
								item={items.find((i) => i.slug === tile.slug)}
								span={12}
								class="h-80 min-h-0"
							/>
						</ShowcaseGrid>
					{:else if emailHtml}
						<!-- The real build-time render, scaled to fit; links inside stay inert. -->
						<iframe
							title="Welcome email preview"
							srcdoc={emailHtml}
							loading="lazy"
							tabindex="-1"
							class="pointer-events-none absolute top-0 left-1/2 h-[200%] w-[600px] origin-top -translate-x-1/2 scale-[0.6] border-0"
						></iframe>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</section>
