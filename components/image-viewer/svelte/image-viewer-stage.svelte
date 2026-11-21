<script lang="ts">
import type { Attachment } from "svelte/attachments";
import { cn } from "../../lib/cn";
import { imageViewer } from "../variants";
import { wheelFactor } from "../zoom";
import { getImageViewer } from "./context.svelte";

let { class: classProp }: { class?: string } = $props();

const viewer = getImageViewer();
const styles = $derived(imageViewer({ variant: viewer.variant }));
let dragging = $state(false);
let loaded = $state(false);
let drag: { x: number; y: number; vx: number; vy: number } | null = null;

$effect(() => {
	void viewer.image?.src;
	loaded = false;
});

// Svelte registers wheel handlers as passive, so zoom needs its own non-passive listener.
const measure: Attachment<HTMLDivElement> = (el) => {
	const size = () => {
		viewer.stage = { w: el.clientWidth, h: el.clientHeight };
	};
	const observer = new ResizeObserver(size);
	observer.observe(el);
	size();
	const onWheel = (event: WheelEvent) => {
		event.preventDefault();
		const r = el.getBoundingClientRect();
		viewer.zoomBy(wheelFactor(event.deltaY), {
			x: event.clientX - r.left - r.width / 2,
			y: event.clientY - r.top - r.height / 2,
		});
	};
	el.addEventListener("wheel", onWheel, { passive: false });
	return () => {
		observer.disconnect();
		el.removeEventListener("wheel", onWheel);
	};
};

// Warm the neighbours so stepping never shows an empty frame.
$effect(() => {
	for (const delta of [-1, 1]) {
		const next = viewer.images[viewer.index + delta];
		if (next) new Image().src = next.src;
	}
});

function onpointerdown(event: PointerEvent) {
	if (viewer.view.scale <= 1) return;
	(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
	drag = { x: event.clientX, y: event.clientY, vx: viewer.view.x, vy: viewer.view.y };
	dragging = true;
}
function onpointermove(event: PointerEvent) {
	if (!drag) return;
	viewer.setView({
		scale: viewer.view.scale,
		x: drag.vx + event.clientX - drag.x,
		y: drag.vy + event.clientY - drag.y,
	});
}
function endDrag() {
	drag = null;
	dragging = false;
}
function ondblclick(event: MouseEvent) {
	if (viewer.view.scale > 1) return viewer.fit();
	const r = (event.currentTarget as HTMLElement).getBoundingClientRect();
	viewer.zoomBy(2.5, {
		x: event.clientX - r.left - r.width / 2,
		y: event.clientY - r.top - r.height / 2,
	});
}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	{@attach measure}
	data-slot="image-viewer-stage"
	data-zoomed={viewer.view.scale > 1 ? "" : undefined}
	class={cn(
		styles.stage(),
		viewer.view.scale > 1 && (dragging ? "cursor-grabbing" : "cursor-grab"),
		classProp,
	)}
	{onpointerdown}
	{onpointermove}
	onpointerup={endDrag}
	onpointercancel={endDrag}
	{ondblclick}
>
	{#if viewer.image}
		{#key viewer.image.src}
			<img
				src={viewer.image.src}
				alt={viewer.image.alt}
				draggable="false"
				data-loaded={loaded ? "" : undefined}
				data-dragging={dragging ? "" : undefined}
				onload={(event) => {
					const el = event.currentTarget;
					if (!(el instanceof HTMLImageElement)) return;
					viewer.loaded = { w: el.naturalWidth, h: el.naturalHeight };
					loaded = true;
				}}
				style:width={viewer.base.w ? `${viewer.base.w}px` : undefined}
				style:height={viewer.base.h ? `${viewer.base.h}px` : undefined}
				style:transform="translate({viewer.view.x}px, {viewer.view.y}px) scale({viewer.view.scale})"
				class={styles.image()}
			/>
		{/key}
	{/if}
</div>
