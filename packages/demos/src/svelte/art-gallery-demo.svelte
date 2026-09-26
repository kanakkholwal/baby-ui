<script lang="ts">
import { ArtGallery, type ArtGalleryLens } from "@baby-ui/svelte";
import { GALLERY_ITEMS } from "../data/obsidian";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<ArtGallery
	items={GALLERY_ITEMS}
	lens={(props.lens as ArtGalleryLens) ?? "barrel"}
	cellSize={Number(props.cellSize ?? 0.75)}
	dragZoom={Number(props.dragZoom ?? 1.25)}
	showHint={(props.showHint as boolean) ?? true}
/>
