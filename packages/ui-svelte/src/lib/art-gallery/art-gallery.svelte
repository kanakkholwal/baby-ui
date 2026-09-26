<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import Spinner from "../spinner/spinner.svelte";
import { type ArtGalleryItem, createGallery } from "./gallery";
import { ART_GALLERY_LABELS, type ArtGalleryLabels } from "./labels";
import { type ArtGalleryLens, artGallery, LENS_STRENGTH } from "./variants";

let {
	items,
	cellSize = 0.75,
	dragZoom = 1.25,
	lens = "barrel",
	showHint = true,
	labels,
	class: classProp,
}: {
	/** Tiles repeat endlessly in both directions; images need CORS headers if remote. */
	items: ArtGalleryItem[];
	/** Cell size in world units; the view is 2 units tall. */
	cellSize?: number;
	/** How far the view pulls back while dragging; 1 disables it. */
	dragZoom?: number;
	lens?: ArtGalleryLens;
	showHint?: boolean;
	labels?: Partial<ArtGalleryLabels>;
	class?: string;
} = $props();

let root: HTMLElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
let phase = $state<"loading" | "webgl" | "fallback">("loading");
let gallery: ReturnType<typeof createGallery> | undefined;
const l = $derived({ ...ART_GALLERY_LABELS, ...labels });
const s = $derived(artGallery({ lens }));
const options = $derived({ cellSize, dragZoom, lens: LENS_STRENGTH[lens] });

$effect(() => {
	const list = items;
	const el = root;
	const surface = canvas;
	if (!el || !surface) return;
	phase = "loading";
	// Options flow through update(); only new items rebuild the atlases.
	gallery = untrack(() =>
		createGallery(el, surface, list, options, (webgl) => {
			phase = webgl ? "webgl" : "fallback";
		}),
	);
	return () => gallery?.destroy();
});

$effect(() => {
	gallery?.update(options);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -- focus is how arrow keys pan the grid -->
<section
	bind:this={root}
	data-slot="art-gallery"
	aria-label={l.label}
	aria-roledescription="gallery"
	aria-busy={phase === "loading"}
	tabindex="0"
	class={cn(s.root(), classProp)}
>
	<ul class="sr-only">
		{#each items as item (item.src)}
			<li>{item.title}{item.caption ? `, ${item.caption}` : ""}</li>
		{/each}
	</ul>
	<canvas bind:this={canvas} class={cn(s.canvas(), phase !== "webgl" && "opacity-0")}></canvas>
	{#if phase === "loading"}
		<div class={s.status()}><Spinner label={l.loading} /></div>
	{:else if phase === "fallback"}
		<div class={s.fallback()}>
			{#each items as item (item.src)}
				<figure>
					<img src={item.src} alt={item.alt ?? item.title} class={s.fallbackImage()} />
					<figcaption class={s.fallbackCaption()}>
						<span>{item.title}</span>
						{#if item.caption}<span>{item.caption}</span>{/if}
					</figcaption>
				</figure>
			{/each}
		</div>
	{:else if showHint}
		<p aria-hidden="true" class={s.hint()}>{l.hint}</p>
	{/if}
</section>
