<script lang="ts">
import {
	Button,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
	ImageGallery,
	ImageGalleryEmpty,
	ImageGalleryGrid,
	Lightbox,
	LightboxBody,
	LightboxClose,
	LightboxContent,
	LightboxCounter,
	LightboxFilmstrip,
	LightboxNext,
	LightboxPrevious,
	LightboxStage,
	LightboxToolbar,
	LightboxZoom,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { IMAGE_GALLERY_SAMPLES } from "../data/lightbox";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ImageGallery>>(props));
let images = $state(IMAGE_GALLERY_SAMPLES);
let open = $state(false);
let index = $state(0);
</script>

<div class="grid w-full max-w-3xl gap-4">
	<div class="flex justify-end">
		<Button variant="outline" size="sm" onclick={() => (images = images.length ? [] : IMAGE_GALLERY_SAMPLES)}>
			{images.length ? "Clear pictures" : "Restore pictures"}
		</Button>
	</div>
	<ImageGallery
		{images}
		variant={p.variant}
		selectable={p.selectable}
		columnWidth={p.columnWidth}
		onOpen={(next) => {
			index = next;
			open = true;
		}}
	>
		<ImageGalleryGrid />
		<ImageGalleryEmpty>
			<EmptyHeader>
				<EmptyTitle>No pictures yet</EmptyTitle>
				<EmptyDescription>Pictures you add show up here.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button onclick={() => (images = IMAGE_GALLERY_SAMPLES)}>Add pictures</Button>
			</EmptyContent>
		</ImageGalleryEmpty>
	</ImageGallery>
	<Lightbox
		{images}
		bind:open
		bind:index
		origin={(at) => document.querySelector(`[data-slot=image-gallery-item][data-index="${at}"]`)}
	>
		<LightboxContent>
			<LightboxToolbar>
				<LightboxPrevious />
				<LightboxCounter />
				<LightboxNext />
				<LightboxZoom class="mx-auto" />
				<LightboxClose />
			</LightboxToolbar>
			<LightboxBody>
				<LightboxStage />
			</LightboxBody>
			<LightboxFilmstrip />
		</LightboxContent>
	</Lightbox>
</div>
