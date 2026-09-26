<script lang="ts">
import ComponentCard from "$lib/components/component-card.svelte";
import Seo from "$lib/components/seo.svelte";
import { CATEGORY_LABEL, componentCountLabel } from "$lib/registry";
import { breadcrumbLd, collectionLd } from "$lib/seo";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const total = $derived(data.sections.reduce((n, s) => n + s.items.length, 0));
const DESCRIPTION = $derived(
	`Browse ${componentCountLabel(total)} animated, accessible React and Svelte components: controls, blocks, charts, text effects, backgrounds and AI agent UI.`,
);
</script>

<Seo
	title="React & Svelte Components"
	description={DESCRIPTION}
	tag="{componentCountLabel(total)} components"
	jsonLd={[
		collectionLd({
			name: "Baby UI components",
			description: DESCRIPTION,
			path: "/components",
			items: data.sections.flatMap((s) => s.items.map((i) => ({ name: i.name, path: i.href }))),
		}),
		breadcrumbLd([{ name: "Components", path: "/components" }]),
	]}
/>

<div class="min-w-0 py-8 xl:col-span-2">
	<h1 class="font-semibold text-3xl text-foreground tracking-tight">Components</h1>
	<p class="mt-2 max-w-2xl text-muted-foreground">
		{total} components, charts included, each with a React and a Svelte port built from the same spec.
	</p>

	{#each data.sections as group (group.category)}
		<section id={group.category} class="mt-12 scroll-mt-20">
			<div class="flex items-baseline gap-2">
				<h2 class="font-semibold text-foreground text-lg tracking-tight">
					{CATEGORY_LABEL[group.category]}
				</h2>
				<span class="text-muted-foreground text-sm tabular-nums">{group.items.length}</span>
			</div>
			<div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{#each group.items as item (item.slug)}
					<ComponentCard {item} />
				{/each}
			</div>
		</section>
	{/each}
</div>
