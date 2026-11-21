<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { MAX_SCALE, ZOOM_STEP } from "../zoom";
import { getImageViewer } from "./context.svelte";
import Control from "./image-viewer-control.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
const styles = $derived(imageViewer({ variant: viewer.variant }));
</script>

<div data-slot="image-viewer-zoom" role="group" aria-label="Zoom" class={cn("flex items-center gap-1", classProp)}>
	<Control icon="zoomOut" label="Zoom out" disabled={viewer.view.scale <= 1} onclick={() => viewer.zoomBy(1 / ZOOM_STEP)} />
	<button
		type="button"
		aria-label="Fit to window"
		title="Fit to window"
		class={styles.zoomValue()}
		onclick={viewer.fit}
	>
		{viewer.percent}%
	</button>
	<Control icon="zoomIn" label="Zoom in" disabled={viewer.view.scale >= MAX_SCALE} onclick={() => viewer.zoomBy(ZOOM_STEP)} />
	<Control icon="fit" label="Fit to window" disabled={viewer.view.scale === 1} onclick={viewer.fit} />
	{#if viewer.actual}
		<Button variant="ghost" size="sm" class={styles.control()} onclick={viewer.showActual}>100%</Button>
	{/if}
</div>
