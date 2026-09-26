<script lang="ts">
import { ImageTrail } from "@baby-ui/svelte";

const images = [
	"https://picsum.photos/id/10/300/400",
	"https://picsum.photos/id/11/300/400",
	"https://picsum.photos/id/15/300/400",
];
</script>

<ImageTrail {images} variant="fall" />
