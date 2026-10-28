<script lang="ts">
import type { Category } from "@baby-ui/registry-schema";
import type { Snippet } from "svelte";
import type { CardItem } from "#lib/registry.js";
import ComponentCard, {
	type CardFrame,
	type CardSelection,
	FRAME_PX,
} from "./component-card.svelte";

let {
	items,
	lead,
	mode = "masonry",
	selection,
}: {
	items: CardItem[];
	/** An intro tile placed first, at its own measured height. */
	lead?: Snippet;
	mode?: "masonry" | "grid";
	/** Grid mode only: a checkbox on each card for bulk actions. */
	selection?: CardSelection;
} = $props();

const GAP = 12;
// The lead's height until it is measured.
const LEAD_PX = 246;

// Wide canvases never get the shortest frame.
const CANVAS: ReadonlySet<Category> = new Set([
	"charts",
	"blocks",
	"backgrounds",
	"advanced",
	"og-images",
	"emails",
]);

/** A height from the slug's hash: varied across the gallery, identical on every load. */
function frameFor(item: CardItem): CardFrame {
	let hash = 0;
	for (const char of item.slug) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
	const sizes: CardFrame[] = CANVAS.has(item.category)
		? ["md", "lg", "xl"]
		: ["sm", "md", "lg"];
	return sizes[hash % sizes.length] ?? "md";
}

// Columns follow the gallery's own width (42rem, 64rem, 80rem), so a tile stays about 20rem.
let width = $state(0);
let leadHeight = $state(0);
// One column per 20rem a card needs, as the grid mode does, capped where tiles stop reading as a wall.
const count = $derived(Math.max(1, Math.min(6, Math.floor((width + GAP) / (320 + GAP)))));

type Placed = { column: number; top: number; height: number };

/** Shortest column first, in item order: tiles read left to right and stay in DOM order. */
const layout = $derived.by(() => {
	const heights = new Array<number>(count).fill(0);
	const place = (height: number): Placed => {
		const column = heights.indexOf(Math.min(...heights));
		const top = heights[column] ?? 0;
		heights[column] = top + height + GAP;
		return { column, top, height };
	};
	const leadAt = lead ? place(leadHeight || LEAD_PX) : null;
	const tiles = items.map((item) => {
		const frame = frameFor(item);
		return { item, frame, at: place(FRAME_PX[frame]) };
	});
	return { leadAt, tiles, height: Math.max(0, ...heights) - GAP };
});

const at = (p: Placed) => ({
	left: `calc(${p.column} * ((100% - ${GAP * (count - 1)}px) / ${count} + ${GAP}px))`,
	width: `calc((100% - ${GAP * (count - 1)}px) / ${count})`,
	top: `${p.top}px`,
});
</script>

{#snippet leadTile()}
	<div bind:clientHeight={leadHeight}>
		{@render lead?.()}
	</div>
{/snippet}

{#if mode === "grid"}
	<div class="@container">
		<!-- Columns follow the width a card needs to read, so a wide page gets more of them, not wider gaps. -->
		<div class="grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-3">
			{#each items as item (item.slug)}
				<ComponentCard {item} frame="md" {selection} />
			{/each}
		</div>
	</div>
{:else}
	<div bind:clientWidth={width}>
	{#if width}
		<div class="relative" style:height="{layout.height}px">
			{#if layout.leadAt}
				{@const p = at(layout.leadAt)}
				<div class="absolute" style:left={p.left} style:width={p.width} style:top={p.top}>
					{@render leadTile()}
				</div>
			{/if}
			{#each layout.tiles as tile (tile.item.slug)}
				{@const p = at(tile.at)}
				<div class="absolute" style:left={p.left} style:width={p.width} style:top={p.top}>
					<ComponentCard item={tile.item} frame={tile.frame} />
				</div>
			{/each}
		</div>
	{:else}
		<!-- Before the width is known (server render): CSS columns, so the first paint is not empty. -->
		<div class="@container">
			<div class="columns-1 gap-3 *:mb-3 *:break-inside-avoid @2xl:columns-2 @5xl:columns-3 @7xl:columns-4">
				{#if lead}{@render leadTile()}{/if}
				{#each items as item (item.slug)}
					<ComponentCard {item} frame={frameFor(item)} />
				{/each}
			</div>
		</div>
	{/if}
	</div>
{/if}
