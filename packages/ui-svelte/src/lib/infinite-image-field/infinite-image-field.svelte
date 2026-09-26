<script lang="ts">
import { untrack } from "svelte";
import { cn } from "../lib/cn";
import { type FieldOptions, mountField } from "./field";
import { INFINITE_IMAGE_FIELD_LABELS, type InfiniteImageFieldLabels } from "./labels";
import {
	type InfiniteImageFieldLayout,
	type InfiniteImageFieldShape,
	type InfiniteImageFieldSize,
	infiniteImageField,
} from "./variants";

let {
	images,
	shape = "rounded",
	layout = "grid",
	size,
	imageWidth = 160,
	imageHeight = 220,
	gap = 24,
	maxSpeed = 5,
	smoothing = 0.07,
	labels,
	class: className,
}: {
	/** Image URLs; each cell always shows the same one. */
	images: string[];
	shape?: InfiniteImageFieldShape;
	/** `staggered` offsets every other column by half a tile. */
	layout?: InfiniteImageFieldLayout;
	size?: InfiniteImageFieldSize;
	/** Tile size in CSS px. */
	imageWidth?: number;
	imageHeight?: number;
	/** Space between tiles in CSS px. */
	gap?: number;
	/** Top drift speed in CSS px per frame at 60fps. */
	maxSpeed?: number;
	/** How quickly the drift follows the pointer, 0 to 1 per frame. */
	smoothing?: number;
	labels?: Partial<InfiniteImageFieldLabels>;
	class?: string;
} = $props();

const l = $derived({ ...INFINITE_IMAGE_FIELD_LABELS, ...labels });
const s = $derived(infiniteImageField({ shape, layout, size }));
const options: FieldOptions = $derived({
	images,
	shape,
	layout,
	imageWidth,
	imageHeight,
	gap,
	maxSpeed,
	smoothing,
});

let root = $state<HTMLElement>();
let canvas = $state<HTMLCanvasElement>();
let engine: ReturnType<typeof mountField> | undefined;

$effect(() => {
	if (!root || !canvas) return;
	engine = mountField(
		root,
		canvas,
		untrack(() => $state.snapshot(options)),
	);
	return () => engine?.destroy();
});

$effect(() => {
	const next = $state.snapshot(options);
	engine?.update(next);
});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -- focus is how arrow keys drift the field -->
<section
	bind:this={root}
	data-slot="infinite-image-field"
	aria-label={l.label}
	tabindex="0"
	class={cn(s.root(), className)}
>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
</section>
