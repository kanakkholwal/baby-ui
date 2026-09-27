<script lang="ts">
import type { Snippet } from "svelte";
import { canvasEngine } from "../lib/canvas-engine.svelte";
import { cn } from "../lib/cn";
import { type IridescentFoldOptions, mountIridescentFold } from "./fold";
import {
	IRIDESCENT_FOLD_COLORS,
	IRIDESCENT_FOLD_SPEED,
	type IridescentFoldPosition,
	type IridescentFoldSpeed,
	type IridescentFoldTone,
	iridescentFold,
} from "./variants";

let {
	tone = "spectrum",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	grain = 0,
	class: classProp,
	children,
}: {
	tone?: IridescentFoldTone;
	speed?: IridescentFoldSpeed;
	position?: IridescentFoldPosition;
	/** Effect strength, 0 to 2. */
	intensity?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	class?: string;
	children?: Snippet;
} = $props();

let root: HTMLDivElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
const gl = canvasEngine(
	mountIridescentFold,
	() => ({ root, canvas }),
	() => options,
);
const s = $derived(iridescentFold({ tone, speed, position, webgl: gl.webgl }));
const options: IridescentFoldOptions = $derived({
	colors: IRIDESCENT_FOLD_COLORS[tone],
	speed: IRIDESCENT_FOLD_SPEED[speed],
	intensity,
	grain,
});
</script>

<div bind:this={root} data-slot="iridescent-fold" class={cn(s.root(), classProp)}>
	<div aria-hidden="true" class={s.fallback()}></div>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	{#if children}
		<div class={s.content()}>{@render children()}</div>
	{/if}
</div>
