<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Badge } from "@baby-ui/svelte/badge";
import { ShowcaseGrid } from "@baby-ui/svelte/showcase-grid";
import type { CardItem, NavCategory } from "#lib/registry.js";
import ShowcasePanel from "./showcase-panel.svelte";

let {
	items,
	categories,
	emailHtml,
	ogSlug,
}: { items: CardItem[]; categories: NavCategory[]; emailHtml?: string; ogSlug: string } =
	$props();

type Tile = {
	category: string;
	slug?: string;
	title: string;
	text: string;
	pro?: boolean;
	/** Columns of 12 on wide screens. */
	span: 5 | 7 | 12;
	/** The preview well's height. */
	min: string;
};

const SPAN = { 5: "md:col-span-5", 7: "md:col-span-7", 12: "md:col-span-12" } as const;

// A bento of the areas most libraries leave out: agent UI leads, and the last row fills 12 columns with or without Emails.
const TILES: Tile[] = $derived([
	{
		category: "agents",
		slug: "tool-chips",
		title: "Agent UI",
		text: "Tool calls, plans, approvals and chat.",
		span: 7,
		min: "h-80 sm:h-88",
	},
	{
		category: "charts",
		slug: "sankey-chart",
		title: "Charts",
		text: "d3 and SVG, keyboard navigable.",
		span: 5,
		min: "h-80 sm:h-88",
	},
	{
		category: "og-images",
		slug: ogSlug,
		title: "OG images",
		text: "1200 × 630 cards rendered to PNG.",
		span: emailHtml ? 5 : 12,
		min: "h-72 sm:h-80",
	},
	...(emailHtml
		? [
				{
					category: "emails",
					title: "Emails",
					text: "Templates for React Email and Svelte, fitted to your brand.",
					pro: true,
					span: 7 as const,
					min: "h-72 sm:h-80",
				},
			]
		: []),
]);

const hrefOf = (category: string) =>
	categories.find((c) => c.category === category)?.href ?? "/components";
const countOf = (category: string) =>
	categories.find((c) => c.category === category)?.count;
</script>

<section aria-labelledby="home-breadth-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2
				id="home-breadth-heading"
				class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
			>
				Not just buttons and inputs
			</h2>
			<p class="mt-2 text-muted-foreground">The areas most libraries leave out, each running live.</p>
		</div>
		<a
			href="/components"
			class="group inline-flex items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			All categories
			<IconArrowRight
				size={14}
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
	</div>
	<div class="mt-8 grid gap-3 md:grid-cols-12">
		{#each TILES as tile (tile.category)}
			<article class="flex min-w-0 flex-col rounded-2xl bg-card p-1 {SPAN[tile.span]}">
				<a
					href={hrefOf(tile.category)}
					class="group flex items-start justify-between gap-4 rounded-xl px-4 py-3 outline-none transition-colors duration-(--duration-fast) hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
				>
					<span class="flex flex-col gap-0.5">
						<span class="font-medium text-foreground">
							{tile.title}
							{#if countOf(tile.category)}<span class="ml-1 text-muted-foreground tabular-nums">{countOf(tile.category)}</span>{/if}
							{#if tile.pro}<Badge variant="gold" size="sm" class="ml-1.5 align-middle">Pro</Badge>{/if}
						</span>
						<span class="text-muted-foreground text-sm">{tile.text}</span>
					</span>
					<IconArrowRight
						size={16}
						aria-hidden="true"
						class="mt-1 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
					/>
				</a>
				<div class="relative overflow-hidden rounded-[calc(var(--radius-2xl)-0.25rem)] bg-background {tile.min}">
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
							title="Newsletter email preview"
							scrolling="no"
							srcdoc={emailHtml}
							loading="lazy"
							tabindex="-1"
							class="pointer-events-none absolute top-0 left-1/2 h-[200%] w-[600px] origin-top -translate-x-1/2 scale-[0.6] overflow-hidden border-0"
						></iframe>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</section>
