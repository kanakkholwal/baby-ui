<script lang="ts">
import type { NavCategory } from "#lib/registry.js";

let { categories }: { categories: NavCategory[] } = $props();
</script>

<!-- Browse by what you are building: every category one tap away, with how much is in it. -->
<section aria-labelledby="home-categories-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<h2
		id="home-categories-heading"
		class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
	>
		Start from what you are building
	</h2>
	<ul class="mt-8 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-3 lg:grid-cols-4">
		{#each categories as group (group.category)}
			<li>
				<a
					href={group.href}
					class="flex h-full flex-col gap-1 rounded-xl bg-card px-4 py-3 outline-none transition-colors duration-(--duration-fast) hover:bg-foreground/[0.06] focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
				>
					<span class="font-medium text-foreground text-sm">{group.label}</span>
					<span class="text-muted-foreground text-xs tabular-nums">{group.count} components</span>
				</a>
			</li>
		{/each}
	</ul>
</section>
