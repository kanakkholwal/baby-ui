<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button, DiaText, RollingDigits, ShimmerText } from "@baby-ui/svelte";
import HeroBackdrop, {
	HERO_BACKDROPS,
	type HeroBackdropPattern,
} from "./hero-backdrop.svelte";

let {
	newCount = 0,
	total = 0,
	categories = 0,
}: { newCount?: number; total?: number; categories?: number } = $props();

// `?backdrop=rings` or `horizon` previews the others; read in the browser, as the page is prerendered.
let backdrop = $state<HeroBackdropPattern>("blocks");
$effect(() => {
	const wanted = new URLSearchParams(location.search).get("backdrop");
	backdrop = HERO_BACKDROPS.find((name) => name === wanted) ?? "blocks";
});

// Slow on purpose: the hero is read, not watched.
const TAILS = [
	"React and Svelte, one spec.",
	"agents, charts and forms.",
	"calm motion, built in.",
];
const METRICS = $derived([
	// Rounded down to tens with a "+", the same rule as componentCountLabel.
	{ value: Math.floor(total / 10) * 10, suffix: "+", label: "components" },
	{ value: 2, suffix: "", label: "frameworks" },
	{ value: categories, suffix: "", label: "categories" },
]);

// Rounded down to a multiple of five, so the badge reads "55+" rather than an exact tally.
const newLabel = $derived(
	newCount >= 5 ? `${Math.floor(newCount / 5) * 5}+` : String(newCount),
);
</script>

<!-- Centred, quiet copy on the page background over a faint drifting backdrop. -->
<section class="relative isolate flex min-h-[calc(100svh-var(--header-h))] w-full flex-col justify-center overflow-x-clip px-4 py-20">
	<HeroBackdrop pattern={backdrop} />
	<div>
		<div class="flex flex-col items-center text-center">
			<div class="flex flex-col items-center">
				{#if newCount > 0}
					<!-- p-px: the rotating beam shows through as a 1px ring around the pill. -->
					<a
						href="/components#new"
						class="hero-in group relative mb-6 inline-flex rounded-full bg-border p-px text-foreground text-xs transition-[scale] duration-150 ease-[var(--ease-ui-out)] active:scale-[0.97] motion-reduce:transition-none"
					>
						<span aria-hidden="true" class="new-beam absolute inset-0 rounded-full"></span>
						<span class="relative inline-flex items-center gap-2 rounded-full bg-background py-1 pr-3 pl-1">
							<span class="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.08] px-2 py-0.5 font-medium">
								<span aria-hidden="true" class="new-dot size-1.5 rounded-full bg-primary"></span>
								New
							</span>
							<ShimmerText as="span" text="{newLabel} components just landed" />
							<IconArrowRight
								size={13}
								aria-hidden="true"
								class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
							/>
						</span>
					</a>
				{/if}
				<h1
					class="hero-in m-0 text-balance font-display font-medium text-[2rem] text-foreground leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl"
					style:--i="1"
				>
					UI for products that ship
					<!-- One line reserved for the cycling tail, so a swap never reflows the page. -->
					<span class="block h-[1.1em] whitespace-nowrap text-muted-foreground">
						<DiaText text={TAILS} repeat triggerOnView={false} durationMs={1600} repeatDelayMs={4200}  textColor="var(--muted-foreground)"/>
					</span>
				</h1>
				<p class="hero-in mt-5 max-w-lg text-pretty text-base text-muted-foreground leading-7" style:--i="2">
					Accessible components with calm motion, installed as source with the shadcn CLI.
				</p>
				<div class="hero-in mt-8 flex flex-wrap items-center justify-center gap-2.5" style:--i="3">
					<Button href="/components" size="lg" variant="dark" class="rounded-full px-5">Browse components</Button>
					<Button href="/docs/installation" size="lg" variant="secondary" class="group rounded-full px-5">
						Get started
						<IconArrowRight
							aria-hidden="true"
							class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
						/>
					</Button>
				</div>
				<dl class="hero-in mt-12 flex items-center gap-8 text-sm sm:gap-12" style:--i="4">
					{#each METRICS as metric (metric.label)}
						<div class="flex flex-col items-center gap-1">
							<dt class="order-2 text-muted-foreground text-xs">{metric.label}</dt>
							<dd class="m-0 font-display font-medium text-2xl text-foreground tabular-nums">
								<RollingDigits value={metric.value} durationMs={1800} />{metric.suffix}
							</dd>
						</div>
					{/each}
				</dl>

			</div>
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

	/* Registered so the conic gradient's start angle can animate. */
	@property --beam-angle {
		syntax: "<angle>";
		inherits: false;
		initial-value: 0deg;
	}

	.new-beam {
		background: conic-gradient(
			from var(--beam-angle),
			transparent 0% 65%,
			var(--primary) 82%,
			color-mix(in oklch, var(--primary) 40%, var(--foreground)) 90%,
			transparent 100%
		);
		animation: beam-spin 3s linear infinite;
	}

	.new-dot {
		animation: dot-pulse 1.6s var(--ease-ui-out) infinite;
	}

	@keyframes beam-spin {
		to {
			--beam-angle: 360deg;
		}
	}

	@keyframes dot-pulse {
		0% {
			box-shadow: 0 0 0 0 color-mix(in oklch, var(--primary-foreground) 70%, transparent);
		}
		100% {
			box-shadow: 0 0 0 5px transparent;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.hero-in),
		.new-beam,
		.new-dot {
			animation: none;
		}
	}
</style>
