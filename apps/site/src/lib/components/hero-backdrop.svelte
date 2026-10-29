<script lang="ts">
let { class: classProp = "" }: { class?: string } = $props();

// Outlines of UI blocks, as rounded rects and text rules: [x, y, width, height].
const BLOCKS: [number, number, number, number][] = [
	[40, 60, 220, 140],
	[300, 30, 160, 90],
	[500, 80, 260, 120],
	[810, 40, 180, 160],
	[1040, 90, 220, 110],
	[120, 250, 180, 110],
	[340, 170, 240, 150],
	[640, 240, 200, 100],
	[880, 230, 260, 130],
	[1180, 240, 160, 120],
];
</script>

<!-- Decoration only: faint outlines of UI blocks drifting slowly behind the hero copy. -->
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_45%,black_20%,transparent_70%)] {classProp}"
>
	{#each [0, 1] as layer (layer)}
		<svg
			viewBox="0 0 1400 400"
			preserveAspectRatio="xMidYMid slice"
			data-layer={layer}
			class="hero-drift absolute inset-x-[-10%] top-[8%] h-[80%] w-[120%] fill-none stroke-foreground/[0.07] [stroke-width:1]"
		>
			{#each BLOCKS as [x, y, w, h], i (i)}
				{@const dx = layer ? 60 : 0}
				<rect x={x + dx} y={y + layer * 70} width={w} height={h} rx="14" />
				<path d="M{x + dx + 18} {y + layer * 70 + 26}h{w * 0.45}M{x + dx + 18} {y + layer * 70 + 44}h{w * 0.3}" />
			{/each}
		</svg>
	{/each}
</div>

<style>
	/* Two layers drift apart and back over a minute: felt, not watched. */
	.hero-drift {
		animation: hero-drift 60s ease-in-out infinite alternate;
	}
	.hero-drift[data-layer="1"] {
		animation-duration: 75s;
		animation-direction: alternate-reverse;
		opacity: 0.6;
	}
	@keyframes hero-drift {
		from {
			translate: -3% 0;
		}
		to {
			translate: 3% -2%;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-drift {
			animation: none;
		}
	}
</style>
