<script lang="ts">
import {
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Gauge,
	RollingDigits,
	StatCard,
	TextLoop,
} from "@baby-ui/svelte";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import { prefs } from "$lib/preferences.svelte";

const installs = [
	{ date: new Date("2026-06-01"), installs: 3120 },
	{ date: new Date("2026-06-08"), installs: 3480 },
	{ date: new Date("2026-06-15"), installs: 3310 },
	{ date: new Date("2026-06-22"), installs: 4020 },
	{ date: new Date("2026-06-29"), installs: 4590 },
	{ date: new Date("2026-07-06"), installs: 5210 },
];
const TICKS = [12840, 13120, 13560, 14210];
const SLUGS = [
	"dia-text",
	"records-table",
	"wheel-picker",
	"week-calendar",
	"rolling-digits",
];
const CLI = { react: "shadcn@latest", svelte: "shadcn-svelte@latest" } as const;
const count = new Intl.NumberFormat("en-US").format;
const TILE = "gap-3 py-4";
const TILE_PAD = "px-4";

let run = $state(0);
let tick = $state(0);

$effect(() => {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const id = setInterval(() => (tick = (tick + 1) % TICKS.length), 2400);
	return () => clearInterval(id);
});
</script>

<!-- Each tile sits over a dashed slot: it starts scattered, then scroll settles it into place. -->
<div class="hero-stage relative">
	<div class="absolute -top-3 -right-3 z-20">
		<Button size="icon-sm" variant="outline" aria-label="Replay hero animation" onclick={() => run++}>
			<IconRefresh stroke={1.7} />
		</Button>
	</div>
	{#key run}
		<div class="hero-frame" aria-hidden="true">
			<Card variant="framed">
				<CardHeader class="grid-cols-[1fr_auto]">
					<div>
						<CardTitle class="text-lg">Release pulse</CardTitle>
						<CardDescription>Every component, both frameworks</CardDescription>
					</div>
					<div class="flex items-center gap-2 self-center">
						<Badge variant="outline" dot>Live</Badge>
					</div>
				</CardHeader>
				<CardContent>
					<div class="grid grid-cols-12 gap-3">
						<div class="hero-slot col-span-7 row-span-2" style="--i:0">
							<div class="hero-card h-full" style="--sx:-60px;--sy:40px;--sr:-7deg">
								<StatCard
									title="Weekly installs"
									data={installs}
									dataKey="installs"
									value={5210}
									label="Last 6 weeks"
									trend={13.5}
									formatValue={count}
									color="var(--primary)"
									class="h-full"
								/>
							</div>
						</div>
						<div class="hero-slot col-span-5" style="--i:1">
							<Card class="hero-card {TILE}" style="--sx:80px;--sy:-70px;--sr:9deg">
								<CardHeader class={TILE_PAD}>
									<CardDescription>Downloads today</CardDescription>
								</CardHeader>
								<CardContent class="{TILE_PAD} flex items-end justify-between gap-2">
									<span class="font-medium text-3xl text-foreground tracking-tight">
										<RollingDigits value={TICKS[tick] ?? 0} locale="en-US" startOnView={false} />
									</span>
									<Badge variant="outline" size="sm">+4.2%</Badge>
								</CardContent>
							</Card>
						</div>
						<div class="hero-slot col-span-5" style="--i:2">
							<Card class="hero-card {TILE} items-center" style="--sx:110px;--sy:30px;--sr:-10deg">
								<Gauge value={98} label="A11y score" />
							</Card>
						</div>
						<div class="hero-slot col-span-12" style="--i:3">
							<Card class="hero-card {TILE}" style="--sx:-30px;--sy:90px;--sr:4deg">
								<CardHeader class={TILE_PAD}>
									<CardDescription>Add one to your project</CardDescription>
								</CardHeader>
								<CardContent class={TILE_PAD}>
									<p
										class="flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-[13px]"
									>
										<span class="text-muted-foreground">$</span>
										<span class="text-foreground/70">npx {CLI[prefs.framework]} add …/</span>
										<span class="font-medium text-foreground">
											<TextLoop items={SLUGS} intervalMs={1800} />
										</span>
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	{/key}
</div>

<style>
	.hero-stage {
		perspective: 1800px;
	}

	.hero-frame {
		transform-origin: 50% 0;
		animation: hero-frame-in 900ms var(--ease-out) both;
	}

	.hero-slot {
		position: relative;
		border-radius: 1rem;
		outline: 1px dashed var(--border);
		outline-offset: 3px;
		animation: hero-card-in 700ms var(--ease-out) both;
		animation-delay: calc(250ms + var(--i) * 110ms);
	}

	@keyframes hero-frame-in {
		from {
			opacity: 0;
			transform: translateY(40px) rotateX(18deg);
		}
	}

	@keyframes hero-card-in {
		from {
			opacity: 0;
			transform: translateY(24px) scale(0.96);
		}
	}

	/* Scroll-driven assembly; browsers without it show the settled layout. */
	@supports (animation-timeline: scroll()) {
		.hero-frame {
			animation:
				hero-frame-in 900ms var(--ease-out) both,
				hero-tilt linear both;
			animation-timeline: auto, scroll(root);
			animation-range: normal, 0 55vh;
			animation-composition: replace, add;
		}

		:global(.hero-card) {
			animation: hero-settle linear both;
			animation-timeline: scroll(root);
			animation-range: 0 45vh;
		}

		@keyframes hero-tilt {
			from {
				transform: rotateX(12deg) rotateY(-14deg) rotateZ(5deg);
			}
			to {
				transform: none;
			}
		}

		@keyframes -global-hero-settle {
			from {
				transform: translate(var(--sx), var(--sy)) rotate(var(--sr));
				box-shadow: 0 18px 40px -16px color-mix(in oklch, var(--foreground) 18%, transparent);
			}
			to {
				transform: none;
			}
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-frame,
		.hero-slot,
		:global(.hero-card) {
			animation: none;
		}
	}
</style>
