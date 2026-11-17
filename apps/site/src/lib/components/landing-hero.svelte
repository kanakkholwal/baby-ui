<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button, ShowcaseGrid } from "@baby-ui/svelte";
import type { CardItem } from "#lib/registry.js";
import InstallCommand from "./install-command.svelte";
import ShowcasePanel from "./showcase-panel.svelte";

let {
	slug,
	total = 0,
	items = [],
}: { slug: string; total?: number; items?: CardItem[] } = $props();

// Rounded down to tens with a "+", the same rule as componentCountLabel.
const count = $derived(`${Math.floor(total / 10) * 10}+`);
</script>

<!-- Copy and the install command on the left, a running component on the right: the fold shows the product. -->
<section class="relative w-full overflow-x-clip px-4 pt-12 pb-20 md:px-8 md:pt-16 md:pb-28">
	<div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
		<div class="flex flex-col items-start text-left">
			<h1
				class="hero-in m-0 max-w-[14ch] text-balance font-display font-medium text-[2.5rem] text-foreground leading-[1.05] tracking-[-0.03em] sm:text-5xl lg:max-w-none lg:text-[3.5rem]"
			>
				Components you copy into your project
			</h1>
			<p class="hero-in mt-5 max-w-md text-pretty text-base text-muted-foreground leading-7 md:text-[17px]" style:--i="1">
				{count} components for React and Svelte, built for shadcn projects. Run one command and the source
				lands in your repo, ready to edit.
			</p>

			<div class="hero-in mt-8 w-full max-w-lg" style:--i="2">
				<div class="rounded-2xl bg-card p-1">
					<InstallCommand {slug} cascade />
				</div>
			</div>

			<div class="hero-in mt-5 flex flex-wrap items-center gap-2" style:--i="3">
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

		<div class="hero-in rounded-2xl bg-card p-1" style:--i="2">
			<ShowcaseGrid class="overflow-hidden rounded-[calc(var(--radius-2xl)-0.25rem)]">
				<ShowcasePanel
					slug="task-steps"
					item={items.find((i) => i.slug === "task-steps")}
					span={12}
					class="min-h-80 lg:min-h-[26rem]"
					props={{ variant: "capsules" }}
				/>
			</ShowcaseGrid>
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
