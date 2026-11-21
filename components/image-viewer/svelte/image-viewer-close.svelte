<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { getImageViewer } from "./context.svelte";
import ImageViewerIconView from "./image-viewer-icon.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
const control = $derived(imageViewer({ variant: viewer.variant }).control());
</script>

<DialogPrimitive.Close
	data-slot="image-viewer-close"
	aria-label="Close"
	title="Close"
	class={cn(
		"grid size-9 place-items-center rounded-lg outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
		control,
		classProp,
	)}
>
	<ImageViewerIconView name="close" />
</DialogPrimitive.Close>
