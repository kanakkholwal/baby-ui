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
	HeroStage,
	HeroStageSlot,
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

<div class="relative">
	<div class="absolute -top-3 -right-3 z-20">
		<Button size="icon-sm" variant="outline" aria-label="Replay hero animation" onclick={() => run++}>
			<IconRefresh stroke={1.7} />
		</Button>
	</div>
	{#key run}
		<div aria-hidden="true">
			<HeroStage>
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
							<HeroStageSlot class="col-span-7 row-span-2" index={0} x={-60} y={40} rotate={-7}>
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
							</HeroStageSlot>
							<HeroStageSlot class="col-span-5" index={1} x={80} y={-70} rotate={9}>
								<Card class={TILE}>
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
							</HeroStageSlot>
							<HeroStageSlot class="col-span-5" index={2} x={110} y={30} rotate={-10}>
								<Card class="{TILE} items-center">
									<Gauge value={98} label="A11y score" />
								</Card>
							</HeroStageSlot>
							<HeroStageSlot class="col-span-12" index={3} x={-30} y={90} rotate={4}>
								<Card class={TILE}>
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
							</HeroStageSlot>
						</div>
					</CardContent>
				</Card>
			</HeroStage>
		</div>
	{/key}
</div>
