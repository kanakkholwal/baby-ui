<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
import InstallCommand from "./install-command.svelte";

let { slug, total = 0 }: { slug: string; total?: number } = $props();

// Rounded down to tens with a "+", the same rule as componentCountLabel.
const count = $derived(`${Math.floor(total / 10) * 10}+`);
</script>

<!-- One headline, one sentence, one command. The product starts right below. -->
<section class="w-full px-4 pt-16 pb-14 md:pt-24 md:pb-16">
	<div class="mx-auto flex max-w-3xl flex-col items-center text-center">
		<h1
			class="hero-in m-0 text-balance font-display font-medium text-4xl text-foreground leading-[1.08] tracking-[-0.03em] sm:text-5xl"
		>
			Components you copy into your project
		</h1>
		<p class="hero-in mt-4 max-w-xl text-pretty text-base text-muted-foreground" style:--i="1">
			{count} components for React and Svelte. Install one with the shadcn CLI and the source is yours.
		</p>

		<div class="hero-in mt-8 w-full max-w-lg text-left" style:--i="2">
			<div class="rounded-2xl bg-card p-1">
				<InstallCommand {slug} cascade />
			</div>
		</div>

		<div class="hero-in mt-4 flex items-center gap-2" style:--i="3">
			<Button href="/components" variant="dark" class="group">
				Browse components
				<IconArrowRight
					aria-hidden="true"
					class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
				/>
			</Button>
			<Button href="/docs/installation" variant="ghost">Installation guide</Button>
		</div>
	</div>
</section>

<style>
	/* One entrance, played once: 400ms per block, 50ms apart, done by 450ms. */
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
