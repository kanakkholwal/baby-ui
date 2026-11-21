<script lang="ts">
import {
	Button,
	ImageViewer,
	ImageViewerBody,
	ImageViewerClose,
	ImageViewerContent,
	ImageViewerCounter,
	ImageViewerFilmstrip,
	ImageViewerNext,
	ImageViewerPrevious,
	ImageViewerStage,
	ImageViewerToolbar,
	ImageViewerTrigger,
	ImageViewerZoom,
} from "@baby-ui/svelte";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn" },
	{ src: "/photos/two.jpg", alt: "A street market" },
];
</script>

<ImageViewer {images}>
	<ImageViewerTrigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Open</Button>
		{/snippet}
	</ImageViewerTrigger>
	<ImageViewerContent>
		<ImageViewerToolbar>
			<ImageViewerPrevious />
			<ImageViewerCounter />
			<ImageViewerNext />
			<ImageViewerZoom class="mx-auto" />
			<ImageViewerClose />
		</ImageViewerToolbar>
		<ImageViewerBody>
			<ImageViewerStage />
		</ImageViewerBody>
		<ImageViewerFilmstrip />
	</ImageViewerContent>
</ImageViewer>
