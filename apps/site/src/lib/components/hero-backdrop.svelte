<script lang="ts">
let { class: classProp = "" }: { class?: string } = $props();

const RINGS = [120, 200, 290, 390, 500];
</script>

<!-- Decoration only: faint concentric rings with a few nodes orbiting slowly behind the hero copy. -->
<div
	aria-hidden="true"
	class="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_45%,black_20%,transparent_70%)] {classProp}"
>
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
</div>

<style>
	.hero-orbit {
		rotate: var(--orbit-start);
		animation: hero-orbit var(--orbit-time) linear infinite;
	}
	@keyframes hero-orbit {
		to {
			rotate: calc(var(--orbit-start) + 360deg);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-orbit {
			animation: none;
		}
	}
</style>
