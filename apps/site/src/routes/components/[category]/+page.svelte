<script lang="ts">
import ComponentCard from "$lib/components/component-card.svelte";
import { CATEGORY_BLURB, CATEGORY_LABEL } from "$lib/registry";
import { specs } from "@baby-ui/registry-schema/components";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const label = $derived(CATEGORY_LABEL[data.category]);
const items = $derived(data.slugs.map((slug) => specs.find((s) => s.slug === slug)));
</script>

<svelte:head>
	<title>{label}· Baby UI</title>
	<meta name="description" content={CATEGORY_BLURB[data.category]} />
</svelte:head>

<div class="min-w-0 py-8 xl:col-span-2">
	<nav aria-label="Breadcrumb" class="flex items-center gap-1.5 text-sm">
		<a href="/components" class="text-muted-foreground transition-colors hover:text-foreground">
			Components
		</a>
		<span class="text-muted-foreground">/</span>
		<span class="font-medium text-foreground">{label}</span>
	</nav>

	<h1 class="mt-4 font-semibold text-3xl text-foreground tracking-tight">{label}</h1>
	<p class="mt-2 max-w-2xl text-muted-foreground">{CATEGORY_BLURB[data.category]}</p>

	<div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each items as spec (spec?.slug)}
			{#if spec}
				<ComponentCard {spec} />
			{/if}
		{/each}
	</div>
</div>
