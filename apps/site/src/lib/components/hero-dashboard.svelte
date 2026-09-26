<script lang="ts">
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	HeroStage,
	HeroStageSlot,
	Progress,
	RollingDigits,
	StatCard,
} from "@baby-ui/svelte";
import IconRefresh from "@tabler/icons-svelte/icons/refresh";
import { prefs } from "$lib/preferences.svelte";
import TextCascade from "./text-cascade.svelte";

const installs = [
	{ date: new Date("2026-06-01"), installs: 3120 },
	{ date: new Date("2026-06-08"), installs: 3480 },
	{ date: new Date("2026-06-15"), installs: 3310 },
	{ date: new Date("2026-06-22"), installs: 4020 },
	{ date: new Date("2026-06-29"), installs: 4590 },
	{ date: new Date("2026-07-06"), installs: 5210 },
];
const TICKS = [12840, 13120, 13560, 14210];
const DAILY_GOAL = 15000;
const SLUGS = [
	"dia-text",
	"records-table",
	"wheel-picker",
	"week-calendar",
	"art-gallery",
];
const CLI = { react: "shadcn@latest", svelte: "shadcn-svelte@latest" } as const;
const BRANDS = ["react", "svelte"];
const count = new Intl.NumberFormat("en-US").format;
const TILE = "gap-3 py-4";
const TILE_PAD = "px-4";

const TEAM = [12, 32, 47, 5].map((n) => `https://i.pravatar.cc/80?img=${n}`);

let run = $state(0);
let tick = $state(0);

$effect(() => {
	if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
	const id = setInterval(() => (tick = (tick + 1) % TICKS.length), 2400);
	return () => clearInterval(id);
});

const today = $derived(TICKS[tick] ?? 0);
const slug = $derived(SLUGS[tick % SLUGS.length] ?? "button");
</script>

<div class="relative">
	<div class="absolute -top-3 -right-3 z-20">
		<Button size="icon-sm" variant="outline" aria-label="Replay hero animation" onclick={() => run++}>
			<IconRefresh stroke={1.7} />
		</Button>
	</div>
	{#key run}
		<!-- Decorative: inert keeps its demo controls out of the tab order and away from readers. -->
		<div aria-hidden="true" inert>
			<HeroStage>
				<Card variant="framed">
					<CardHeader class="grid-cols-[1fr_auto]">
						<div>
							<CardTitle class="text-lg">Release pulse</CardTitle>
							<CardDescription>Every component, both frameworks</CardDescription>
						</div>
						<div class="flex items-center gap-3 self-center">
							<div class="flex -space-x-2">
								{#each TEAM as src (src)}
									<Avatar size="sm" class="size-7 ring-2 ring-card">
										<AvatarImage {src} alt="" />
										<AvatarFallback></AvatarFallback>
									</Avatar>
								{/each}
							</div>
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
									<CardContent class="{TILE_PAD} flex flex-col gap-3">
										<div class="flex items-end justify-between gap-2">
											<span class="font-medium text-3xl text-foreground tracking-tight tabular-nums">
												<RollingDigits value={today} locale="en-US" startOnView={false} />
											</span>
											<Badge variant="success" size="sm">+4.2%</Badge>
										</div>
										<Progress value={today} max={DAILY_GOAL} size="sm" label="Daily goal" />
										<p class="-mt-1.5 text-muted-foreground text-xs tabular-nums">
											{Math.round((today / DAILY_GOAL) * 100)}% of {count(DAILY_GOAL)} goal
										</p>
									</CardContent>
								</Card>
							</HeroStageSlot>
							<HeroStageSlot class="col-span-5" index={2} x={110} y={30} rotate={-10}>
								<Card class="{TILE} h-full justify-center">
									<CardContent class="{TILE_PAD} flex items-center justify-between gap-3">
										<div class="flex flex-col gap-1">
											<CardDescription>Ports in sync</CardDescription>
											<span class="font-medium text-2xl text-foreground tracking-tight tabular-nums">
												{count(160)}<span class="text-base text-muted-foreground"> / {count(160)}</span>
											</span>
										</div>
										<div class="flex -space-x-1.5">
											{#each BRANDS as brand (brand)}
												<span
													class="grid size-9 place-items-center rounded-full border border-border bg-background ring-2 ring-card"
												>
													<span
														class="size-4.5 bg-foreground"
														style:mask="url(https://cdn.simpleicons.org/{brand}) center / contain no-repeat"
													></span>
												</span>
											{/each}
										</div>
									</CardContent>
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
											<span class="text-[#1f6feb] dark:text-[#ffa657]">npx</span>
											<span class="text-foreground/70">{CLI[prefs.framework]} add …/</span>
											<span class="font-medium text-[#0a3069] dark:text-[#a5d6ff]">
												<TextCascade value={slug} />
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
