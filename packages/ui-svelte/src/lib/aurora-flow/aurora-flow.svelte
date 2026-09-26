<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cn } from "../lib/cn";
import { type AuroraFlowOptions, mountAuroraFlow } from "./aurora";
import {
	AURORA_FLOW_COLORS,
	AURORA_FLOW_SPEED,
	type AuroraFlowPosition,
	type AuroraFlowSpeed,
	type AuroraFlowTone,
	auroraFlow,
} from "./variants";

let {
	tone = "chart",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	grain = 0.22,
	direction = -18,
	interactive = true,
	class: classProp,
	children,
}: {
	tone?: AuroraFlowTone;
	speed?: AuroraFlowSpeed;
	position?: AuroraFlowPosition;
	/** Veil and light strength, 0 to 2. */
	intensity?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	/** Flow direction in degrees. */
	direction?: number;
	/** Veils bend toward the pointer. */
	interactive?: boolean;
	class?: string;
	children?: Snippet;
} = $props();

let root: HTMLDivElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
let webgl = $state(false);
let engine: ReturnType<typeof mountAuroraFlow> | undefined;
const s = $derived(auroraFlow({ tone, speed, position, webgl }));
const options: AuroraFlowOptions = $derived({
	colors: AURORA_FLOW_COLORS[tone],
	speed: AURORA_FLOW_SPEED[speed],
	intensity,
	grain,
	direction,
	interactive,
});

$effect(() => {
	const el = root;
	const surface = canvas;
	if (!el || !surface) return;
	const mounted = untrack(() =>
		mountAuroraFlow(el, surface, options, (ok) => {
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

<div bind:this={root} data-slot="aurora-flow" class={cn(s.root(), classProp)}>
	<div aria-hidden="true" class={s.fallback()}></div>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	{#if children}
		<div class={s.content()}>{@render children()}</div>
	{/if}
</div>
