<script lang="ts">
import CardGallery from "#lib/components/card-gallery.svelte";
import GalleryIntro from "#lib/components/gallery-intro.svelte";
import Seo from "#lib/components/seo.svelte";
import {
	breadcrumbLd,
	categoryKeywords,
	collectionLd,
	metaDescription,
} from "#lib/seo.js";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const label = $derived(data.label);
const path = $derived(data.path);
const topLevel = $derived(data.topLevel);
const heading = $derived(topLevel ? label : `${label} Components`);
const back = $derived(
	topLevel ? undefined : { label: "Components", href: "/components" },
);
const count = $derived(data.items.length);
const description = $derived(
	metaDescription(
		data.blurb,
		`${count} components for React and Svelte, via the shadcn CLI.`,
	),
);
</script>

<Seo
	title="{heading} for React & Svelte"
	{description}
	tag="{count} components"
	keywords={categoryKeywords(label)}
	jsonLd={[
		collectionLd({
			name: heading,
			description,
			path,
			items: data.items.map((i) => ({
				name: i.name,
				path: i.href,
				description: i.description,
			})),
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
	<!-- The page header is the first gallery's opening tile. -->
	{#if data.groups}
		{#each data.groups as group, index (group.id)}
			{@const opening = index === 0}
			<section
				id={group.id}
				class={[opening ? "mt-2" : "mt-12", "scroll-mt-[calc(var(--header-h)+1.5rem)]"]}
			>
				{#if !opening}
					<div class="mb-4 flex items-baseline gap-2">
						<h2 class="font-semibold text-foreground text-lg tracking-tight">{group.label}</h2>
						<span class="text-muted-foreground text-sm tabular-nums">{group.items.length}</span>
					</div>
				{/if}
				{#if opening}
					<CardGallery items={group.items}>
						{#snippet lead()}
							<GalleryIntro
								title={label}
								description={data.blurb}
								items={data.items}
								{back}
							/>
						{/snippet}
					</CardGallery>
				{:else}
					<CardGallery items={group.items} />
				{/if}
			</section>
		{/each}
	{:else}
		<div class="mt-2">
			<CardGallery items={data.items}>
				{#snippet lead()}
					<GalleryIntro title={label} description={data.blurb} items={data.items} {back} />
				{/snippet}
			</CardGallery>
		</div>
	{/if}

	<section aria-labelledby="category-about" class="mt-16 max-w-2xl text-muted-foreground text-sm leading-relaxed">
		<h2 id="category-about" class="font-medium text-base text-foreground">About {heading}</h2>
		<p class="mt-2">
			{count} {heading} for React and Svelte, each with a TypeScript and a JavaScript
			version. They install as source with the shadcn CLI, take their colours from your theme
			tokens, and respect reduced motion and keyboard use.
		</p>
		<p class="mt-2">
			Start with <a href={data.items[0]?.href} class="font-medium text-foreground underline underline-offset-4"
				>{data.items[0]?.name}</a
			>, or read the <a href="/docs/installation" class="font-medium text-foreground underline underline-offset-4"
				>install guide</a
			>.
		</p>
	</section>
</main>
