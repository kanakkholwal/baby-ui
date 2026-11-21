<script lang="ts">
import {
	Button,
	ImageViewer,
	ImageViewerBody,
	ImageViewerClose,
	ImageViewerContent,
	ImageViewerCounter,
	ImageViewerDetails,
	ImageViewerDetailsToggle,
	ImageViewerFilmstrip,
	ImageViewerMinimap,
	ImageViewerNext,
	ImageViewerPrevious,
	ImageViewerStage,
	ImageViewerToolbar,
	ImageViewerTrigger,
	ImageViewerZoom,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { IMAGE_VIEWER_SAMPLES } from "../data/image-viewer";
import { controlProps } from "../data/preview-props";
import Facts from "./facts.svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof ImageViewer>>(props));
</script>

<ImageViewer images={IMAGE_VIEWER_SAMPLES} variant={p.variant} loop={p.loop}>
	<ImageViewerTrigger>
		{#snippet child({ props: triggerProps })}
			<Button {...triggerProps} variant="outline">Open viewer</Button>
		{/snippet}
	</ImageViewerTrigger>
	<ImageViewerContent>
		<ImageViewerToolbar>
			<ImageViewerPrevious />
			<ImageViewerCounter />
			<ImageViewerNext />
			<ImageViewerZoom class="mx-auto" />
			<ImageViewerDetailsToggle />
			<ImageViewerClose />
		</ImageViewerToolbar>
		<ImageViewerBody>
			<ImageViewerStage />
					<ImageViewerMinimap />
			<ImageViewerDetails>
				<Facts />
			</ImageViewerDetails>
		</ImageViewerBody>
		<ImageViewerFilmstrip />
	</ImageViewerContent>
</ImageViewer>
