<script lang="ts">
import { registry } from "virtual:docvia/source";
import { Renderer } from "@docvia/renderer-svelte";
import OutlineNav from "$lib/components/outline-nav.svelte";
import PageMenu from "$lib/components/page-menu.svelte";
import PromoCard from "$lib/components/promo-card.svelte";
import { productFor } from "$lib/products";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head><title>{data.page.data?.title ?? "Docs"} · Baby UI</title></svelte:head>

<main class="min-w-0 py-8">
	<div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
		<div>
			<h1 class="font-semibold text-3xl text-foreground tracking-tight">{data.page.data?.title}</h1>
			{#if data.page.data?.description}
				<p class="mt-2 text-muted-foreground">{data.page.data.description}</p>
			{/if}
		</div>
		<PageMenu
			markdownUrl="/docs/{data.slug}.md"
			copyText={data.page.data?.description ?? ""}
		/>
	</div>
	<article class="prose-baby mt-8 max-w-2xl"><Renderer nodes={data.page.content} {registry} /></article>
</main>

<aside aria-label="On this page" class="hidden min-w-0 xl:block">
	<div
		class="scrollbar-hide fixed top-24 right-8 z-10 flex max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) flex-col gap-5 overflow-y-auto pb-1"
	>
		{#if data.headings.length}
			<div>
				<p class="mb-2 px-1 font-medium text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
					On this page
				</p>
				<OutlineNav headings={data.headings} />
			</div>
		{/if}
		<PromoCard product={productFor(data.slug)} />
	</div>
</aside>
