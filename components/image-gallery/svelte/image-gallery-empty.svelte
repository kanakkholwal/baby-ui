<script lang="ts">
import type { ComponentProps } from "svelte";
import Empty from "../../empty/svelte/empty.svelte";
import { getImageGallery } from "./context";

/** Shown only while the gallery has no pictures; compose `EmptyHeader` and a call to action inside. */
let { children, ...rest }: ComponentProps<typeof Empty> = $props();

const gallery = getImageGallery();
</script>

{#if gallery.images.length === 0}
	<Empty data-slot="image-gallery-empty" variant="outline" {...rest}>
		{@render children?.()}
	</Empty>
{/if}
