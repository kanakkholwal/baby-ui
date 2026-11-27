<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import type { LightboxVariant } from "../variants";
import { type LightboxImage, LightboxState, setLightbox } from "./context.svelte";

let {
	children,
	images,
	open = $bindable(false),
	index = $bindable(0),
	detailsOpen = $bindable(true),
	loop = false,
	variant = "immersive",
	origin,
}: {
	children?: Snippet;
	images: LightboxImage[];
	open?: boolean;
	index?: number;
	detailsOpen?: boolean;
	loop?: boolean;
	variant?: LightboxVariant;
	/** The thumbnail element for a picture, so it flies out of and back into it. Triggers with an `index` register themselves. */
	origin?: (index: number) => HTMLElement | null | undefined;
} = $props();

const viewer = new LightboxState({
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
	open: () => open,
	origin: () => origin,
});
setLightbox(viewer);

$effect(() => {
	void viewer.index;
	void open;
	viewer.reset();
});
</script>

<DialogPrimitive.Root bind:open>
	{@render children?.()}
</DialogPrimitive.Root>
