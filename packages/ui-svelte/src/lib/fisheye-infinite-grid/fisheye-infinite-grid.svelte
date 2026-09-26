<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { type FisheyeGridItem, type FisheyeOptions, mountFisheye } from "./fisheye";
import { FISHEYE_INFINITE_GRID_LABELS, type FisheyeInfiniteGridLabels } from "./labels";
import {
	type FisheyeInfiniteGridSize,
	type FisheyeInfiniteGridVariant,
	fisheyeInfiniteGrid,
} from "./variants";

let {
	items,
	variant = "card",
	size,
	tileWidth = 150,
	tileHeight = 180,
	gap = 8,
	lens = 0.8,
	inertia = 0.94,
	labels,
	class: className,
}: {
	/** Tiles repeat endlessly in both directions. */
	items: FisheyeGridItem[];
	/** `card` frames each image with a caption row; `plain` shows bare images. */
	variant?: FisheyeInfiniteGridVariant;
	size?: FisheyeInfiniteGridSize;
	/** Tile size in CSS px at the edge of the lens. */
	tileWidth?: number;
	tileHeight?: number;
	/** Space between tiles in CSS px. */
	gap?: number;
	/** Extra magnification at the centre; 0 is a flat grid. */
	lens?: number;
	/** Momentum kept after a drag, 0 to 0.98. */
	inertia?: number;
	labels?: Partial<FisheyeInfiniteGridLabels>;
	class?: string;
} = $props();

const l = $derived({ ...FISHEYE_INFINITE_GRID_LABELS, ...labels });
const s = $derived(fisheyeInfiniteGrid({ variant, size }));
const options: FisheyeOptions = $derived({
	items,
	variant,
	tileWidth,
	tileHeight,
	gap,
	lens,
	inertia,
});

let root = $state<HTMLElement>();
let canvas = $state<HTMLCanvasElement>();
let engine: ReturnType<typeof mountFisheye> | undefined;

$effect(() => {
	if (!root || !canvas) return;
	engine = mountFisheye(
		root,
		canvas,
		untrack(() => $state.snapshot(options)),
	);
	return () => engine?.destroy();
});

$effect(() => {
	const next = $state.snapshot(options);
	engine?.update(next);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -- focus is how arrow keys pan the grid -->
<section
	bind:this={root}
	data-slot="fisheye-infinite-grid"
	data-dragging="false"
	aria-label={l.label}
	aria-roledescription="gallery"
	tabindex="0"
	class={cn(s.root(), className)}
>
	<ul class="sr-only">
		{#each items as item, index (index)}
			<li>
				{item.title ? `${item.title}: ` : ""}{item.alt}{item.caption ? `, ${item.caption}` : ""}
			</li>
		{/each}
	</ul>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	<div aria-hidden="true" class={s.vignette()}></div>
</section>
