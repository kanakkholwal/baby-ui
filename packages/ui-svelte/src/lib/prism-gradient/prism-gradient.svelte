<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cn } from "../lib/cn";
import { mountPrismGradient, type PrismGradientOptions } from "./prism";
import {
	PRISM_GRADIENT_COLORS,
	PRISM_GRADIENT_SPEED,
	type PrismGradientPosition,
	type PrismGradientSpeed,
	type PrismGradientTone,
	prismGradient,
} from "./variants";

let {
	tone = "chart",
	speed = "normal",
	position = "absolute",
	grain = 0,
	class: classProp,
	children,
}: {
	tone?: PrismGradientTone;
	speed?: PrismGradientSpeed;
	position?: PrismGradientPosition;
	/** Film grain, 0 to 1. */
	grain?: number;
	class?: string;
	children?: Snippet;
} = $props();

let root: HTMLDivElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
let webgl = $state(false);
let engine: ReturnType<typeof mountPrismGradient> | undefined;
const s = $derived(prismGradient({ tone, speed, position, webgl }));
const options: PrismGradientOptions = $derived({
	colors: PRISM_GRADIENT_COLORS[tone],
	speed: PRISM_GRADIENT_SPEED[speed],
	grain,
});

$effect(() => {
	const el = root;
	const surface = canvas;
	if (!el || !surface) return;
	const mounted = untrack(() =>
		mountPrismGradient(el, surface, options, (ok) => {
			webgl = ok;
		}),
	);
	engine = mounted;
	return () => {
		mounted.destroy();
		engine = undefined;
	};
});

$effect(() => {
	engine?.update(options);
});
</script>

<div bind:this={root} data-slot="prism-gradient" class={cn(s.root(), classProp)}>
	<div aria-hidden="true" class={s.fallback()}></div>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	{#if children}
		<div class={s.content()}>{@render children()}</div>
	{/if}
</div>
