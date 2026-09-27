<script lang="ts">
import { DiaText, FillButton, SilkAurora } from "@baby-ui/svelte";

const TAILS = ["feel alive.", "move with you.", "ship twice."];

// Measured, not claimed: the chart and base pages pass axe, and every component ships both ports.
const PROOF = [
	"0 axe violations",
	"Keyboard first",
	"Reduced motion",
	"React + Svelte",
	"shadcn CLI",
];
</script>

<div class="relative isolate overflow-x-clip">
	<SilkAurora
		tone="surface"
		speed="slow"
		intensity={0.8}
		class="-z-10 [mask-image:linear-gradient(to_bottom,black_45%,transparent)]"
	/>

	<div class="mx-auto flex max-w-3xl flex-col items-center px-4 pt-24 pb-24 text-center md:pt-36 md:pb-32">
		<h1 class="hero-in font-normal text-5xl text-foreground leading-[1.02] tracking-[-0.05em] sm:text-6xl xl:text-7xl">
			<span class="block">Interfaces that</span>
			<span class="block">
				<DiaText text={TAILS} repeat triggerOnView={false} durationMs={900} repeatDelayMs={2600} />
			</span>
		</h1>

		<p
			class="hero-in mt-6 max-w-lg text-pretty text-base text-foreground/70 leading-7 sm:text-lg sm:leading-8"
			style:--i="1"
		>
			Accessible components for React and Svelte, built for real product screens: agents, data,
			forms and charts. Installed as source with the shadcn CLI.
		</p>

		<div class="hero-in mt-9" style:--i="2">
			<FillButton href="/components">Browse components</FillButton>
		</div>

		<ul
			aria-label="What every component ships with"
			class="hero-in mt-12 flex max-w-xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-muted-foreground text-xs"
			style:--i="3"
		>
			{#each PROOF as fact, i (fact)}
				<li class="flex items-center gap-5">
					{#if i > 0}<span aria-hidden="true" class="size-1 rounded-full bg-border-strong"></span>{/if}
					{fact}
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	/* One entrance, played once: 400ms per block, 50ms apart, done by 550ms. */
	.hero-in {
		animation: hero-in 400ms var(--ease-out) both;
		animation-delay: calc(var(--i, 0) * 50ms);
	}

	/* Phones: visible from the first frame, so the headline is the LCP paint; it only rises. */
	@media (max-width: 767px) {
		.hero-in {
			animation-name: hero-rise;
		}
	}

	/* Keyboard focus never waits for an entrance to finish. */
	.hero-in:focus-within {
		animation: none;
	}

	@keyframes hero-in {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
	}

	@keyframes hero-rise {
		from {
			transform: translateY(8px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-in {
			animation: none;
		}
	}
</style>
