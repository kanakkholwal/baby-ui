<script lang="ts">
import CardGallery from "#lib/components/card-gallery.svelte";
import GalleryIntro from "#lib/components/gallery-intro.svelte";
import Seo from "#lib/components/seo.svelte";
import { CATEGORY_LABEL, componentCountLabel } from "#lib/registry.js";
import { breadcrumbLd, collectionLd } from "#lib/seo.js";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const total = $derived(data.sections.reduce((n, s) => n + s.items.length, 0));
const fresh = $derived(data.fresh);
const SUMMARY = $derived(
	`${total} components, charts included, each with a React and a Svelte port built from the same spec.`,
);
const groups = $derived([
	...(fresh.length ? [{ id: "new", label: "Newly added", items: fresh }] : []),
	...data.sections.map((s) => ({
		id: s.category,
		label: CATEGORY_LABEL[s.category],
		items: s.items,
	})),
]);
const everything = $derived(data.sections.flatMap((s) => s.items));
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

<main class="min-w-0 py-8 xl:col-span-2">
	{#each groups as group, index (group.id)}
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
				<!-- The page header is the gallery's opening tile. -->
				<CardGallery items={group.items}>
					{#snippet lead()}
						<GalleryIntro
							title="Components"
							description={SUMMARY}
							items={everything}
						/>
					{/snippet}
				</CardGallery>
			{:else}
				<CardGallery items={group.items} />
			{/if}
		</section>
	{/each}
</main>
