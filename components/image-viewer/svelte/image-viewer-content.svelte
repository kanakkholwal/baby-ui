<script lang="ts">
import { Dialog as DialogPrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { ZOOM_STEP } from "../zoom";
import { getImageViewer } from "./context.svelte";

let {
	children,
	class: classProp,
	label = "Image viewer",
}: { children?: Snippet; class?: string; label?: string } = $props();

const viewer = getImageViewer();
const styles = $derived(imageViewer({ variant: viewer.variant }));

function onkeydown(event: KeyboardEvent) {
	if (event.target instanceof HTMLElement && event.target.closest("input, textarea"))
		return;
	const zoomed = viewer.view.scale > 1;
	if (event.key === "+" || event.key === "=") viewer.zoomBy(ZOOM_STEP);
	else if (event.key === "-") viewer.zoomBy(1 / ZOOM_STEP);
	else if (event.key === "0") viewer.fit();
	else if (event.key === "ArrowLeft" && !zoomed) viewer.step(-1);
	else if (event.key === "ArrowRight" && !zoomed) viewer.step(1);
	else return;
	event.preventDefault();
}
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Content
		data-slot="image-viewer-content"
		data-variant={viewer.variant}
		aria-label={label}
		{onkeydown}
		class={cn(styles.popup(), classProp)}
	>
		{@render children?.()}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>
