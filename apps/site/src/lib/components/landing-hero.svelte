<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button, DiaText } from "@baby-ui/svelte";
import HeroFragment from "./hero-fragment.svelte";

let { total = 0 }: { total?: number } = $props();

// Slow on purpose: the headline is read, not watched. One line is reserved so a swap never reflows.
const TAILS = ["React and Svelte", "agents and charts", "emails and OG images"];

// Rounded down to tens with a "+", the same rule as componentCountLabel.
const count = $derived(`${Math.floor(total / 10) * 10}+`);
</script>

<!-- Centred copy with two real components fading in from the edges: the product frames the promise. -->
<section class="relative isolate w-full overflow-x-clip px-4 pt-20 pb-16 md:pt-28 md:pb-20">
	<HeroFragment slug="chat-composer" side="left" />
	<HeroFragment slug="agent-activity" side="right" />

	<div class="relative mx-auto flex max-w-2xl flex-col items-center text-center">
		<a
			href="/components"
			class="hero-in group inline-flex items-center gap-2 rounded-full bg-card py-1 pr-3 pl-1 text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
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
			class="hero-in mt-6 mb-0 text-balance font-display font-medium text-[2.5rem] text-foreground leading-[1.05] tracking-[-0.03em] sm:text-6xl"
			style:--i="1"
		>
			UI components for
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
		<p class="hero-in mt-4 max-w-md text-pretty text-base text-muted-foreground sm:text-lg" style:--i="2">
			Components, agent UI, charts, emails and OG images, installed as source.
		</p>
		<div class="hero-in mt-8 flex items-center gap-2" style:--i="3">
			<Button href="/components" variant="dark" size="lg" class="rounded-full px-5">Browse components</Button>
			<Button href="/docs/installation" variant="secondary" size="lg" class="rounded-full px-5">Get started</Button>
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
