<script lang="ts">
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { viewForCentre, viewportRect } from "../zoom";
import { getImageViewer } from "./context.svelte";

/** A thumbnail map shown while zoomed in: the lit rectangle is the visible part, and it can be dragged. */
let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
const styles = $derived(imageViewer({ variant: viewer.variant }));
let box = $state<HTMLDivElement>();
const zoomed = $derived(viewer.view.scale > 1 && !!viewer.image);
const rect = $derived(viewportRect(viewer.view, viewer.base, viewer.stage));
const ratio = $derived(
	viewer.base.w > 0 && viewer.base.h > 0 ? viewer.base.w / viewer.base.h : 1,
);

function pan(event: PointerEvent) {
	const bounds = box?.getBoundingClientRect();
	const el = event.currentTarget;
	if (!bounds || !(el instanceof HTMLElement) || !el.hasPointerCapture(event.pointerId))
		return;
	const fx = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
	const fy = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
	viewer.setView(viewForCentre(viewer.view, viewer.base, fx, fy));
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={box}
	data-slot="image-viewer-minimap"
	data-hidden={zoomed ? undefined : ""}
	aria-hidden="true"
	class={cn(styles.minimap(), classProp)}
	style:aspect-ratio={ratio}
	style:height="5rem"
	onpointerdown={(event) => {
		event.currentTarget.setPointerCapture(event.pointerId);
		pan(event);
	}}
	onpointermove={pan}
>
	{#if viewer.image}
		<img src={viewer.image.thumbnail ?? viewer.image.src} alt="" draggable="false" class="size-full object-cover" />
	{/if}
	<span
		class={styles.minimapRect()}
		style:left={`${rect.left * 100}%`}
		style:top={`${rect.top * 100}%`}
		style:width={`${rect.width * 100}%`}
		style:height={`${rect.height * 100}%`}
	></span>
</div>
