<script lang="ts">
import { IconArrowUpRight, IconCheck } from "@baby-ui/icons";
import { Badge, Button } from "@baby-ui/svelte";
import Seo from "#lib/components/seo.svelte";
import SiteFooter from "#lib/components/site-footer.svelte";
import { SPONSOR_TIERS, SPONSORS, SPONSORS_URL } from "#lib/sponsors.js";

// The low-friction tier carries the highlight; nobody is pushed toward the top slot.
const FEATURED = "backer";
// Logo tiers, biggest first, each with its filled sponsors and the slots still open.
const walls = $derived(
	[...SPONSOR_TIERS.filter((tier) => tier.slots > 0)].reverse().map((tier) => {
		const filled = SPONSORS.filter((s) => s.tier === tier.id);
		return { tier, filled, open: Math.max(0, tier.slots - filled.length) };
	}),
);
const supporters = $derived(SPONSORS.filter((s) => s.tier === "supporter"));
const WALL_GRID: Record<string, string> = {
	gold: "grid-cols-1 sm:grid-cols-3",
	bronze: "grid-cols-2 sm:grid-cols-4",
};
const SLOT_HEIGHT: Record<string, string> = { gold: "h-28", bronze: "h-16" };
</script>

<Seo
	title="Sponsors"
	description="Back Baby UI on GitHub from $3 a month, and help the next components ship."
/>

<main>
	<!-- Opens like the home hero: quiet, centred, one action. -->
	<section class="mx-auto flex max-w-3xl flex-col items-center px-4 pt-24 pb-16 text-center md:pt-32">
		<span class="rounded-full border border-border px-2.5 py-0.5 text-muted-foreground text-xs">Sponsors</span>
		<h1 class="m-0 mt-5 text-balance font-display font-medium text-4xl text-foreground tracking-[-0.03em] md:text-6xl">
			Back the work
			<span class="block text-muted-foreground">from $3 a month.</span>
		</h1>
		<p class="mt-5 max-w-lg text-pretty text-muted-foreground">
			Baby UI is built and kept up by one person. If it saved you an afternoon, a small monthly
			backing keeps new components coming.
		</p>
		<div class="mt-8 flex flex-wrap items-center justify-center gap-2.5">
			<Button href={SPONSORS_URL} target="_blank" rel="noreferrer noopener" size="lg" variant="dark" class="rounded-full px-5">
				Sponsor on GitHub
				<IconArrowUpRight aria-hidden="true" />
			</Button>
			<Button href="#tiers" size="lg" variant="secondary" class="rounded-full px-5">See tiers</Button>
		</div>
	</section>

	<section aria-labelledby="tiers-heading" id="tiers" class="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 md:px-8">
		<h2 id="tiers-heading" class="sr-only">Tiers</h2>
		<ul class="m-0 grid list-none gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
			{#each SPONSOR_TIERS as tier (tier.id)}
				{@const featured = tier.id === FEATURED}
				<li class="rounded-2xl border border-border bg-card p-1">
					<div
						class={[
							"flex h-full flex-col gap-5 rounded-[11px] border p-5",
							featured ? "border-primary/40 bg-popover" : "border-border bg-popover",
						]}
					>
						<div class="flex items-center justify-between gap-2">
							<h3 class="m-0 font-medium text-base text-foreground">{tier.name}</h3>
							{#if featured}<Badge size="sm">Good place to start</Badge>{/if}
						</div>
						<p class="m-0 flex items-baseline gap-1">
							<span class="font-display font-medium text-4xl text-foreground tabular-nums tracking-tight">${tier.price}</span>
							<span class="text-muted-foreground text-sm">/ month</span>
						</p>
						<ul class="m-0 flex flex-1 list-none flex-col gap-2.5 p-0 text-sm">
							{#each tier.benefits as benefit (benefit)}
								<li class="flex gap-2 text-foreground/80">
									<IconCheck size={16} aria-hidden="true" class="mt-0.5 shrink-0 text-muted-foreground" />
									{benefit}
								</li>
							{/each}
						</ul>
						<Button
							href={SPONSORS_URL}
							target="_blank"
							rel="noreferrer noopener"
							variant={featured ? "dark" : "secondary"}
							class="w-full rounded-full"
						>
							Sponsor ${tier.price}/mo
						</Button>
					</div>
				</li>
			{/each}
		</ul>
		<p class="mt-6 text-center text-muted-foreground text-sm">
			Rather not subscribe?
			<a href={SPONSORS_URL} target="_blank" rel="noreferrer noopener" class="text-foreground underline decoration-foreground/30 underline-offset-2 hover:decoration-foreground">Send a one-time amount</a>
			on GitHub Sponsors.
		</p>
	</section>

	<section aria-labelledby="wall-heading" class="mx-auto max-w-6xl px-4 pb-24 md:px-8">
		<div class="mb-10 flex flex-col items-center gap-3 text-center">
			<h2 id="wall-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">
				Our sponsors
			</h2>
			<p class="m-0 max-w-md text-pretty text-muted-foreground">
				{SPONSORS.length ? "Thank you for backing the work." : "No sponsors yet. The first logos go here."}
			</p>
		</div>
		<div class="flex flex-col gap-8">
			{#each walls as wall (wall.tier.id)}
				<div class="flex flex-col gap-3">
					<p class="m-0 text-muted-foreground text-xs">{wall.tier.name}</p>
					<ul class="m-0 grid list-none gap-3 p-0 {WALL_GRID[wall.tier.id]}">
						{#each wall.filled as sponsor (sponsor.href)}
							<li>
								<a
									href={sponsor.href}
									target="_blank"
									rel="noreferrer noopener sponsored"
									class="grid {SLOT_HEIGHT[wall.tier.id]} place-items-center rounded-xl border border-border bg-card px-4 outline-none transition-colors hover:bg-foreground/[0.04] focus-visible:ring-2 focus-visible:ring-ring"
								>
									{#if sponsor.logo}
										<img src={sponsor.logo} alt={sponsor.name} class="max-h-[50%] max-w-[70%] object-contain" />
									{:else}
										<span class="font-medium text-foreground">{sponsor.name}</span>
									{/if}
								</a>
							</li>
						{/each}
						{#each { length: wall.open }, slot (slot)}
							<li>
								<a
									href={SPONSORS_URL}
									target="_blank"
									rel="noreferrer noopener"
									class="grid {SLOT_HEIGHT[wall.tier.id]} place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-xs outline-none transition-colors hover:border-foreground/30 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
								>
									<span>Your logo · ${wall.tier.price}/mo</span>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
			{#if supporters.length}
				<p class="m-0 text-center text-muted-foreground text-sm">
					Supporters: {supporters.map((s) => s.name).join(", ")}
				</p>
			{/if}
		</div>
	</section>

	<SiteFooter />
</main>
