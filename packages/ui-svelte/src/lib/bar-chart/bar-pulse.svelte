<svelte:options namespace="svg" />

<script lang="ts">
import { type Playback, prefersReducedMotion, tween } from "../chart/motion";
import { EASE_IN_OUT, PULSE_MS, type Rect } from "./bar-core";

let { rect }: { rect: Rect } = $props();

const uid = $props.id();
let wave = $state<SVGRectElement | null>(null);
const height = $derived(Math.max(rect.height * 0.55, 36));

/** bklit BarPulse: a white band sweeps bottom to top every 2.4s, ease-in-out, clipped to the bar. */
$effect(() => {
	const tall = height;
	if (prefersReducedMotion()) return;
	let playback: Playback | null = null;
	const cycle = () => {
		playback = tween({
			duration: PULSE_MS,
			ease: EASE_IN_OUT,
			onUpdate: (p) => {
				const start = rect.y + rect.height;
				const end = rect.y - tall;
				wave?.setAttribute("y", String(start + (end - start) * p));
			},
			onComplete: cycle,
		});
	};
	cycle();
	return () => playback?.stop();
});
</script>

<g data-slot="bar-pulse">
	<defs>
		<clipPath id="{uid}-clip">
			<rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} />
		</clipPath>
		<linearGradient id="{uid}-wave" x1="0" x2="0" y1="0" y2="1">
			<stop offset="0%" stop-color="white" stop-opacity={0} />
			<stop offset="50%" stop-color="white" stop-opacity={0.85} />
			<stop offset="100%" stop-color="white" stop-opacity={0} />
		</linearGradient>
	</defs>
	<rect
		bind:this={wave}
		clip-path="url(#{uid}-clip)"
		x={rect.x}
		y={rect.y + rect.height}
		width={rect.width}
		{height}
		fill="url(#{uid}-wave)"
	/>
</g>
