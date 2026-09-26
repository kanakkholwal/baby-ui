<script lang="ts">
import { type Snippet, untrack } from "svelte";
import { cn } from "../lib/cn";
import { mountSilkAurora, type SilkAuroraOptions } from "./silk";
import {
	SILK_AURORA_COLORS,
	SILK_AURORA_SPEED,
	type SilkAuroraPosition,
	type SilkAuroraSpeed,
	type SilkAuroraTone,
	silkAurora,
} from "./variants";

let {
	tone = "pearl",
	speed = "normal",
	position = "absolute",
	intensity = 1,
	grain = 0.85,
	interactive = true,
	class: classProp,
	children,
}: {
	tone?: SilkAuroraTone;
	speed?: SilkAuroraSpeed;
	position?: SilkAuroraPosition;
	/** Ribbon and sheen strength, 0 to 2. */
	intensity?: number;
	/** Film grain, 0 to 1. */
	grain?: number;
	/** Ribbons lean toward the pointer, which lifts a soft sheen. */
	interactive?: boolean;
	class?: string;
	children?: Snippet;
} = $props();

let root: HTMLDivElement | undefined = $state();
let canvas: HTMLCanvasElement | undefined = $state();
let webgl = $state(false);
let engine: ReturnType<typeof mountSilkAurora> | undefined;
const s = $derived(silkAurora({ tone, speed, position, webgl }));
const options: SilkAuroraOptions = $derived({
	colors: SILK_AURORA_COLORS[tone],
	speed: SILK_AURORA_SPEED[speed],
	intensity,
	grain,
	interactive,
});

$effect(() => {
	const el = root;
	const surface = canvas;
	if (!el || !surface) return;
	const mounted = untrack(() =>
		mountSilkAurora(el, surface, options, (ok) => {
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

<div bind:this={root} data-slot="silk-aurora" class={cn(s.root(), classProp)}>
	<div aria-hidden="true" class={s.fallback()}></div>
	<canvas bind:this={canvas} aria-hidden="true" class={s.canvas()}></canvas>
	{#if children}
		<div class={s.content()}>{@render children()}</div>
	{/if}
</div>
