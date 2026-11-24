<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { canvasEngine } from "../../lib/svelte/canvas-engine.svelte";
import { type LightRaysOptions, mountLightRays } from "../rays";
import {
	LIGHT_RAYS_COLORS,
	LIGHT_RAYS_COUNT,
	LIGHT_RAYS_FIELD,
	LIGHT_RAYS_SPEED,
	type LightRaysPosition,
	type LightRaysSpeed,
	type LightRaysTone,
	type LightRaysVariant,
	lightRays,
} from "../variants";

let {
	variant = "soft",
	tone = "primary",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	count,
	seed = 34,
	class: classProp,
	children,
}: {
	variant?: LightRaysVariant;
	tone?: LightRaysTone;
	speed?: LightRaysSpeed;
	position?: LightRaysPosition;
	/** Beam strength, 0 to 2. */
	intensity?: number;
	/** Beams alive at once, 1 to 64. Defaults per variant. */
	count?: number;
	/** Reshuffles beam positions, widths and phases. */
	seed?: number;
	class?: string;
	children?: Snippet;
} = $props();

let root: HTMLDivElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
const options: LightRaysOptions = $derived({
	colors: LIGHT_RAYS_COLORS[tone],
	speed: LIGHT_RAYS_SPEED[speed],
	intensity,
	count: count ?? LIGHT_RAYS_COUNT[variant],
	seed,
	field: LIGHT_RAYS_FIELD[variant],
});
const gl = canvasEngine(
	mountLightRays,
	() => ({ root, canvas }),
	() => options,
);
const s = $derived(lightRays({ variant, tone, speed, position, webgl: gl.webgl }));
</script>

<div bind:this={root} data-slot="light-rays" data-variant={variant} class={cn(s.root(), classProp)}>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	{#if children}
		<div class={s.content()}>{@render children()}</div>
	{/if}
</div>
