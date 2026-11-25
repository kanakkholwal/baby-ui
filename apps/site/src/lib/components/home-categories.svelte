<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import type { NavCategory } from "#lib/registry.js";

let { categories }: { categories: NavCategory[] } = $props();
</script>

<!-- Browse by what you are building: every category one tap away, with what is in it. -->
<section aria-labelledby="home-categories-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2
				id="home-categories-heading"
				class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
			>
				Browse by category
			</h2>
			<p class="mt-2 text-muted-foreground">Start from what you are building.</p>
		</div>
		<a
			href="/components"
			class="group inline-flex items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			All components
			<IconArrowRight
				size={14}
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
	</div>
	<ul class="mt-8 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4">
		{#each categories as group (group.category)}
			<li class="min-w-0">
				<a
					href={group.href}
					class="group flex h-full min-h-32 flex-col gap-2 rounded-2xl bg-card p-4 outline-none transition-[background-color,scale] duration-(--duration-fast) ease-(--ease-ui-out) hover:bg-foreground/[0.05] focus-visible:ring-2 focus-visible:ring-ring active:scale-(--press-scale-sm) motion-reduce:transition-none motion-reduce:active:scale-100"
				>
					<span class="flex items-start justify-between gap-3">
						<span class="font-medium text-base text-foreground">{group.label}</span>
						<span class="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs tabular-nums">{group.count}</span>
					</span>
					<span class="line-clamp-2 text-pretty text-muted-foreground text-sm leading-5">{group.blurb}</span>
					<IconArrowRight
						size={16}
						aria-hidden="true"
						class="mt-auto ms-auto -translate-x-1 text-muted-foreground opacity-0 transition-[opacity,translate] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
					/>
				</a>
			</li>
		{/each}
	</ul>
</section>
