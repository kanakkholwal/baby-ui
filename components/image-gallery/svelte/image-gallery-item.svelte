<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageGallery } from "../variants";
import { getImageGallery, setImageGalleryItem } from "./context";
import ImageGalleryInfo from "./image-gallery-info.svelte";

let {
	index,
	class: classProp,
	children,
}: { index: number; class?: string; children?: Snippet } = $props();

const gallery = getImageGallery();
setImageGalleryItem({
	get index() {
		return index;
	},
});

const image = $derived(gallery.images[index]);
const selected = $derived(gallery.selected.includes(index));
const styles = $derived(imageGallery({ variant: gallery.variant, selected }));
</script>

{#if image}
	<button
		type="button"
		data-slot="image-gallery-item"
		data-selected={selected ? "" : undefined}
		data-feature={gallery.variant === "bento" && index % 5 === 0 ? "" : undefined}
		aria-pressed={gallery.selectable ? selected : undefined}
		aria-label={gallery.selectable ? undefined : `Open ${image.alt}`}
		class={cn(styles.item(), classProp)}
		style:aspect-ratio={gallery.variant === "masonry" && image.width && image.height
			? image.width / image.height
			: undefined}
		onclick={() => (gallery.selectable ? gallery.toggle(index) : gallery.open(index))}
	>
		<img src={image.src} alt={image.alt} loading="lazy" draggable="false" class={styles.image()} />
		{#if gallery.selectable}
			<span aria-hidden="true" class={styles.check()}>
				<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<path d="m5 12.5 4.5 4.5L19 7.5" />
				</svg>
			</span>
		{/if}
		{#if children}
			{@render children()}
		{:else}
			<ImageGalleryInfo />
		{/if}
	</button>
{/if}
