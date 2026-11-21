<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageGallery } from "../variants";
import { getImageGallery, type ImageGalleryImage } from "./context";
import ImageGalleryItem from "./image-gallery-item.svelte";

let {
	class: classProp,
	item,
}: {
	class?: string;
	/** Render one picture; defaults to an `ImageGalleryItem` with its info overlay. */
	item?: Snippet<[ImageGalleryImage, number]>;
} = $props();

const gallery = getImageGallery();
const grid = $derived(imageGallery({ variant: gallery.variant }).grid());
</script>

{#if gallery.images.length > 0}
	<div data-slot="image-gallery-grid" class={cn(grid, classProp)}>
		{#each gallery.images as image, index (image.src)}
			{#if item}
				{@render item(image, index)}
			{:else}
				<ImageGalleryItem {index} />
			{/if}
		{/each}
	</div>
{/if}
