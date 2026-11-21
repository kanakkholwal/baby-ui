<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { ImageViewerVariant } from "../variants";
import {
	type ImageViewerImage,
	ImageViewerState,
	setImageViewer,
} from "./context.svelte";

let {
	children,
	images,
	open = $bindable(false),
	index = $bindable(0),
	detailsOpen = $bindable(true),
	loop = false,
	variant = "immersive",
}: {
	children?: Snippet;
	images: ImageViewerImage[];
	open?: boolean;
	index?: number;
	detailsOpen?: boolean;
	loop?: boolean;
	variant?: ImageViewerVariant;
} = $props();

const viewer = new ImageViewerState({
	images: () => images,
	index: () => index,
	setIndex: (next) => {
		index = next;
	},
	loop: () => loop,
	variant: () => variant,
	detailsOpen: () => detailsOpen,
	setDetailsOpen: (next) => {
		detailsOpen = next;
	},
});
setImageViewer(viewer);

$effect(() => {
	void viewer.index;
	void open;
	viewer.reset();
});
</script>

<DialogPrimitive.Root bind:open>
	{@render children?.()}
</DialogPrimitive.Root>
