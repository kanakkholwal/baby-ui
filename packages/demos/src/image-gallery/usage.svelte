<script lang="ts">
import { ImageGallery, ImageGalleryGrid } from "@baby-ui/svelte";

const images = [
	{ src: "/photos/one.jpg", alt: "A harbour at dawn", width: 1600, height: 1000 },
	{ src: "/photos/two.jpg", alt: "A street market", width: 1000, height: 1400 },
];
</script>

<ImageGallery {images} onOpen={(index) => console.log("open", index)}>
	<ImageGalleryGrid />
</ImageGallery>
