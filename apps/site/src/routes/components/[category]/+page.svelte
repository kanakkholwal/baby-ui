<script lang="ts">
import ComponentCard from "$lib/components/component-card.svelte";
import Seo from "$lib/components/seo.svelte";
import { CATEGORY_BLURB, CATEGORY_LABEL, categoryHref } from "$lib/registry";
import { breadcrumbLd, collectionLd, metaDescription } from "$lib/seo";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const label = $derived(CATEGORY_LABEL[data.category]);
const path = $derived(categoryHref(data.category));
const heading = $derived(data.category === "charts" ? "Charts" : `${label} Components`);
const description = $derived(
	metaDescription(
		CATEGORY_BLURB[data.category],
		"For React and Svelte, via the shadcn CLI.",
	),
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
			data.category === "charts"
				? [{ name: heading, path }]
				: [
						{ name: "Components", path: "/components" },
						{ name: heading, path },
					],
		),
	]}
/>

<div class="min-w-0 py-8 xl:col-span-2">
	{#if data.category !== "charts"}
	<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
		<a href="/components" class="text-muted-foreground transition-colors hover:text-foreground">
			Components
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="font-medium text-foreground">{label}</span>
	</nav>
	{/if}

	<h1 class="mt-4 font-semibold text-3xl text-foreground tracking-tight">{label}</h1>
	<p class="mt-2 max-w-2xl text-muted-foreground">{CATEGORY_BLURB[data.category]}</p>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each data.items as item (item.slug)}
			<ComponentCard {item} />
		{/each}
	</div>
</div>
