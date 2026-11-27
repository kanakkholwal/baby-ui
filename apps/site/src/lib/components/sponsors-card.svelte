<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { SPONSOR_URL, SPONSORS } from "#lib/sponsors.js";
</script>

<aside aria-label="Sponsors" class="rounded-2xl bg-card p-1.5">
	<div class="rounded-[calc(1rem-0.375rem)] bg-background p-4">
		<h2 class="m-0 font-medium text-foreground text-sm">Sponsors</h2>
		{#if SPONSORS.length}
			{#each SPONSORS as tier (tier.label)}
				<p class="m-0 mt-3 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">{tier.label}</p>
				<ul class="m-0 mt-2 flex list-none flex-col gap-3 p-0">
					{#each tier.sponsors as sponsor (sponsor.name)}
						<li>
							<a href={sponsor.href} target="_blank" rel="noreferrer" class="group flex items-start gap-3 no-underline">
								<span class="grid size-8 shrink-0 place-items-center overflow-hidden rounded-lg bg-muted font-medium text-muted-foreground text-xs">
									{#if sponsor.logo}
										<img src={sponsor.logo} alt="" class="size-full object-cover" />
									{:else}
										{sponsor.name.slice(0, 1)}
									{/if}
								</span>
								<span class="flex min-w-0 flex-col">
									<span class="font-medium text-foreground text-sm group-hover:underline">{sponsor.name}</span>
									<span class="text-muted-foreground text-xs leading-relaxed">{sponsor.tagline}</span>
								</span>
							</a>
						</li>
					{/each}
				</ul>
			{/each}
		{:else}
			<p class="m-0 mt-1 text-muted-foreground text-xs leading-relaxed">
				Back Baby UI and put your product in front of the developers who build with it.
			</p>
		{/if}
		<a
			href={SPONSOR_URL}
			target="_blank"
			rel="noreferrer"
			class="group mt-4 inline-flex w-full items-center justify-between gap-2 text-foreground text-sm no-underline"
		>
			Become a sponsor
			<IconArrowRight
				size={15}
				aria-hidden="true"
				class="text-primary transition-transform duration-(--duration-fast) ease-(--ease-ui-out) group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
	</div>
</aside>
