<script lang="ts">
import { IMAGE_VIEWER_ICONS, type ImageViewerIcon } from "../icons";

let { name }: { name: ImageViewerIcon } = $props();
</script>

<svg
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width="1.5"
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d={IMAGE_VIEWER_ICONS[name]} />
</svg>
