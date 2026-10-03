<script lang="ts">
import { Button } from "@baby-ui/svelte";
import ComponentCard from "#lib/components/component-card.svelte";
import Seo from "#lib/components/seo.svelte";
import { breadcrumbLd, collectionLd, metaDescription } from "#lib/seo.js";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const label = $derived(data.label);
const path = $derived(data.path);
const topLevel = $derived(data.topLevel);
const heading = $derived(topLevel ? label : `${label} Components`);
const description = $derived(
	metaDescription(data.blurb, "For React and Svelte, via the shadcn CLI."),
);
</script>

<Seo
	title="{heading} for React & Svelte"
	{description}
	tag="Category"
	keywords={[label.toLowerCase(), "react components", "svelte components"]}
	jsonLd={[
		collectionLd({
			name: heading,
			description,
			path,
			items: data.items.map((i) => ({ name: i.name, path: i.href })),
		}),
		breadcrumbLd(
			topLevel
				? [{ name: heading, path }]
				: [
						{ name: "Components", path: "/components" },
						{ name: heading, path },
					],
		),
	]}
/>

<main class="min-w-0 py-8 xl:col-span-2">
	{#if !topLevel}
	<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
		<a href="/components" class="text-muted-foreground transition-colors hover:text-foreground">
			Components
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="font-medium text-foreground">{label}</span>
	</nav>
	{/if}

	<h1 class="mt-4 font-semibold text-3xl text-foreground tracking-tight">{label}</h1>
	<p class="mt-2 max-w-2xl text-muted-foreground">{data.blurb}</p>

	{#if data.groups}
		<nav aria-label="Jump to section" class="mt-5 flex flex-wrap gap-1.5">
			{#each data.groups as group (group.id)}
				<Button href="#{group.id}" variant="outline" size="sm">{group.label}</Button>
			{/each}
		</nav>

		{#each data.groups as group (group.id)}
			<section id={group.id} class="mt-12 scroll-mt-[calc(var(--header-h)+1.5rem)]">
				<div class="flex items-baseline gap-2">
					<h2 class="font-semibold text-foreground text-lg tracking-tight">{group.label}</h2>
					<span class="text-muted-foreground text-sm tabular-nums">{group.items.length}</span>
				</div>
				<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{#each group.items as item (item.slug)}
						<ComponentCard {item} />
					{/each}
				</div>
			</section>
		{/each}
	{:else}
		<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each data.items as item (item.slug)}
				<ComponentCard {item} />
			{/each}
		</div>
	{/if}
</main>
