<script lang="ts">
import { Button, DiaText, FillButton, ShimmerText } from "@baby-ui/svelte";
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import IconBrandReact from "@tabler/icons-svelte/icons/brand-react";
import IconBrandSvelte from "@tabler/icons-svelte/icons/brand-svelte";
import HeroDashboard from "./hero-dashboard.svelte";

let { count }: { count: number } = $props();

const TAILS = ["feel alive.", "move with you.", "ship twice."];
</script>

<div class="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-10">
	<div class="text-center lg:text-left">
		<a
			href="/components"
			class="reveal group mb-7 inline-flex min-h-8 items-center gap-2 rounded-full border border-border bg-background py-1 pr-3 pl-1 text-foreground text-xs transition-colors hover:border-ring"
		>
			<span class="rounded-full bg-primary px-2 py-0.5 font-medium text-[11px] text-primary-foreground">New</span>
			<ShimmerText as="span" text="Charts, text motion and AI blocks" />
			<IconArrowUpRight
				size={13}
				stroke={1.7}
				class="text-muted-foreground transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>

		<h1 class="font-normal text-5xl text-foreground leading-[1.02] tracking-[-0.05em] sm:text-6xl xl:text-7xl">
			<span class="reveal block">Interfaces that</span>
			<span class="reveal block" style:animation-delay="120ms">
				<DiaText text={TAILS} repeat triggerOnView={false} durationMs={900} repeatDelayMs={2600} />
			</span>
		</h1>

		<p
			class="reveal mx-auto mt-6 max-w-md text-pretty text-base text-foreground/70 leading-7 lg:mx-0"
			style:animation-delay="260ms"
		>
			Accessible, animated components for React and Svelte. One spec, one token layer, installed
			with the shadcn CLI.
		</p>

		<div
			class="reveal mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
			style:animation-delay="380ms"
		>
			<FillButton href="/components">Browse components</FillButton>
			<Button href="/docs" size="lg" variant="outline" class="h-11 rounded-xl">Read the docs</Button>
		</div>

		<div
			class="reveal mt-8 flex items-center justify-center gap-3 lg:justify-start"
			style:animation-delay="480ms"
		>
			<div class="flex -space-x-2">
				<span class="grid size-8 place-items-center rounded-full border border-border bg-background text-foreground">
					<IconBrandReact size={16} stroke={1.6} />
				</span>
				<span class="grid size-8 place-items-center rounded-full border border-border bg-background text-foreground">
					<IconBrandSvelte size={16} stroke={1.6} />
				</span>
			</div>
			<p class="text-left text-foreground/70 text-xs leading-snug">
				{count} components<br />React 19 and Svelte 5
			</p>
		</div>
	</div>

	<div class="reveal hidden md:block" style:animation-delay="150ms">
		<HeroDashboard />
	</div>
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(0.4em);
		animation: reveal 620ms var(--ease-out) forwards;
	}

	@keyframes reveal {
		to {
			opacity: 1;
			transform: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
