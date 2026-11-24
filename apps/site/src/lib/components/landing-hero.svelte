<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button, DiaText, LightRays } from "@baby-ui/svelte";
import HeroFragment from "./hero-fragment.svelte";

let { total = 0 }: { total?: number } = $props();

// Slow on purpose: the headline is read, not watched. One line is reserved so a swap never reflows.
const TAILS = ["React and Svelte", "agents and charts", "emails and OG images"];

// Rounded down to tens with a "+", the same rule as componentCountLabel.
const count = $derived(`${Math.floor(total / 10) * 10}+`);
</script>

<!-- The header is transparent over this section, so the rays run up behind it and the copy
     clears it with its own top padding. -->
<section
	class="relative isolate w-full overflow-x-clip px-4 pt-[calc(var(--header-h)+4.5rem)] pb-20 md:pt-[calc(var(--header-h)+7rem)] md:pb-28"
>
	<LightRays
		tone="spectrum"
		class="pointer-events-none -z-10 h-[40rem] w-full [mask-image:linear-gradient(to_bottom,#000_60%,transparent)] md:h-[54rem]"
	/>
	<HeroFragment slug="chat-composer" side="left" />
	<HeroFragment slug="agent-activity" side="right" />

	<div class="relative mx-auto flex max-w-4xl flex-col items-center text-center">
		<a
			href="/components"
			class="hero-in group inline-flex items-center gap-2 rounded-full bg-card/80 py-1 pr-3 pl-1 text-muted-foreground text-sm outline-none backdrop-blur-sm transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			<span class="rounded-full bg-background px-2 py-0.5 font-medium text-foreground text-xs">Free</span>
			{count} components, emails and OG images
			<IconArrowRight
				size={14}
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
		<h1
			class="hero-in mt-7 mb-0 text-balance font-display font-medium text-[2.5rem] text-foreground leading-[1.04] tracking-[-0.045em] sm:text-7xl lg:text-[5.25rem]"
			style:--i="1"
		>
			UI components
			for
			<span class="block h-[1.1em] whitespace-nowrap">
				<DiaText
					text={TAILS}
					repeat
					triggerOnView={false}
					durationMs={1600}
					repeatDelayMs={4200}
					textColor="var(--muted-foreground)"
				/>
			</span>
		</h1>
		<p class="hero-in mt-6 max-w-xl text-pretty text-lg text-muted-foreground sm:text-xl" style:--i="2">
			Components, agent UI, charts, emails and OG images, installed as source.
		</p>
		<div class="hero-in mt-9 flex items-center gap-2.5" style:--i="3">
			<Button href="/components" variant="dark" size="lg" class="h-11 rounded-full px-6 text-base">Browse components</Button>
			<Button href="/docs/installation" variant="secondary" size="lg" class="h-11 rounded-full px-6 text-base">Get started</Button>
		</div>
	</div>
</section>

<style>
	/* One entrance, played once: 400ms per block, 50ms apart, done by 550ms. */
	:global(.hero-in) {
		animation: hero-in 400ms var(--ease-ui-out) both;
		animation-delay: calc(var(--i, 0) * 50ms);
	}

	/* Phones: visible from the first frame, so the headline is the LCP paint; it only rises. */
	@media (max-width: 767px) {
		:global(.hero-in) {
			animation-name: hero-rise;
		}
	}

	/* Keyboard focus never waits for an entrance to finish. */
	:global(.hero-in:focus-within) {
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
		:global(.hero-in) {
			animation: none;
		}
	}
</style>
