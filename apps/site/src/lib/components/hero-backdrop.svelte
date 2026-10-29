<script lang="ts" module>
export const HERO_BACKDROPS = ["blocks", "rings", "horizon"] as const;
export type HeroBackdropPattern = (typeof HERO_BACKDROPS)[number];
</script>

<script lang="ts">
let {
	pattern = "blocks",
	class: classProp = "",
}: { pattern?: HeroBackdropPattern; class?: string } = $props();

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
const RINGS = [120, 200, 290, 390, 500];
// Floor lines fanning out from a vanishing point above the top edge.
const RAYS = Array.from({ length: 25 }, (_, i) => -1200 + i * 100);
const ROWS = Array.from({ length: 9 }, (_, i) => i);
</script>

<!-- Decoration only: hairline shapes behind the hero copy, moving slowly enough to be felt, not watched. -->
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_45%,black_20%,transparent_70%)] {classProp}"
>
	{#if pattern === "blocks"}
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
	{:else if pattern === "rings"}
		<svg
			viewBox="-600 -600 1200 1200"
			class="absolute top-1/2 left-1/2 h-[140%] w-auto -translate-x-1/2 -translate-y-1/2 fill-none stroke-foreground/[0.08] [stroke-width:1]"
		>
			{#each RINGS as r (r)}
				<circle {r} />
			{/each}
			<!-- Each orbit turns at its own slow pace, carrying one node. -->
			{#each RINGS.slice(1) as r, i (r)}
				<g class="hero-orbit" style:--orbit-time="{60 + i * 25}s" style:--orbit-start="{i * 80}deg">
					<circle cx={r} cy="0" r="3.5" class="fill-foreground/[0.18] stroke-none" />
				</g>
			{/each}
		</svg>
	{:else}
		<svg
			viewBox="-1200 0 2400 600"
			preserveAspectRatio="xMidYMax slice"
			class="absolute inset-x-0 bottom-0 h-[70%] w-full fill-none stroke-foreground/[0.08] [stroke-width:1]"
		>
			{#each RAYS as x (x)}
				<path d="M0 -400L{x * 3} 600" />
			{/each}
			<!-- Rows bunch toward the horizon, and step forward together on a slow loop. -->
			<g class="hero-floor">
				{#each ROWS as i (i)}
					<path d="M-1200 {600 - 600 / (1 + i * 0.55)}H1200" />
				{/each}
			</g>
		</svg>
	{/if}
</div>

<style>
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
	.hero-orbit {
		rotate: var(--orbit-start);
		animation: hero-orbit var(--orbit-time) linear infinite;
	}
	@keyframes hero-orbit {
		to {
			rotate: calc(var(--orbit-start) + 360deg);
		}
	}
	.hero-floor {
		animation: hero-floor 18s ease-in-out infinite alternate;
	}
	@keyframes hero-floor {
		to {
			translate: 0 24px;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-drift,
		.hero-orbit,
		.hero-floor {
			animation: none;
		}
	}
</style>
