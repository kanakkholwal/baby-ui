<script lang="ts">
import { specs } from "@baby-ui/registry-schema/components";
import ComponentCard from "$lib/components/component-card.svelte";
import { CATEGORY_LABEL } from "$lib/registry";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Components· Baby UI</title>
	<meta name="description" content="Every component in the registry, in React and Svelte." />
</svelte:head>

<div class="min-w-0 py-8 xl:col-span-2">
	<h1 class="font-semibold text-3xl text-foreground tracking-tight">Components</h1>
	<p class="mt-2 max-w-2xl text-muted-foreground">
		{specs.length} components, each with a React and a Svelte port built from the same spec.
	</p>

	{#each data.groups as group (group.category)}
		<section id={group.category} class="mt-12 scroll-mt-20">
			<div class="flex items-baseline gap-2">
				<h2 class="font-semibold text-foreground text-lg tracking-tight">
					{CATEGORY_LABEL[group.category]}
				</h2>
				<span class="text-muted-foreground text-sm tabular-nums">{group.items.length}</span>
			</div>
			<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each group.items as item (item.slug)}
					{@const spec = specs.find((s) => s.slug === item.slug)}
					{#if spec}
						<ComponentCard {spec} />
					{/if}
				{/each}
			</div>
		</section>
	{/each}
</div>
