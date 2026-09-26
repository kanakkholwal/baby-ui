<script lang="ts">
import { ArtGallery, type ArtGalleryItem } from "@baby-ui/svelte";

let { works }: { works: ArtGalleryItem[] } = $props();
</script>

<ArtGallery items={works} class="h-[28rem]" />
