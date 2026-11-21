<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageGallery } from "../variants";
import { getImageGallery, getImageGalleryItem } from "./context";

let { class: classProp, children }: { class?: string; children?: Snippet } = $props();

const gallery = getImageGallery();
const item = getImageGalleryItem();
const image = $derived(gallery.images[item.index]);
const info = $derived(imageGallery({ variant: gallery.variant }).info());
</script>

<span data-slot="image-gallery-info" class={cn(info, classProp)}>
	{#if children}
		{@render children()}
	{:else}
		<span class="font-medium">{image?.alt}</span>
		{#if image?.caption}<span class="opacity-75">{image.caption}</span>{/if}
	{/if}
</span>
