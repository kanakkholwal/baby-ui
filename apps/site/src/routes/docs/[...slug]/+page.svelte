<script lang="ts">
import { registry } from "virtual:docvia/source";
import { Renderer } from "@docvia/renderer-svelte";
import IconList from "@tabler/icons-svelte/icons/list";
import MobileNavDrawer from "$lib/components/mobile-nav-drawer.svelte";
import PageMenu from "$lib/components/page-menu.svelte";
import PropsRail from "$lib/components/props-rail.svelte";
import Seo from "$lib/components/seo.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<Seo
	title={data.page.data?.title ?? "Docs"}
	description={data.page.data?.description ?? "Baby UI documentation."}
	keywords={data.page.data?.tags}
	noindex={data.page.data?.draft === true}
/>

{#snippet railContent()}
	<PropsRail slug={data.slug} outline={data.headings} />
{/snippet}

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
	{#if data.headings.length}
		<div class="mt-4 xl:hidden">
			<MobileNavDrawer label="On this page" title="On this page">
				{#snippet icon()}<IconList size={14} stroke={1.6} />{/snippet}
				{#snippet children()}
					{@render railContent()}
				{/snippet}
			</MobileNavDrawer>
		</div>
	{/if}
	<article class="prose-baby mt-8 max-w-2xl"><Renderer nodes={data.page.content} {registry} /></article>
</main>

<aside aria-label="On this page" class="hidden min-w-0 xl:block">
	<div
		class="scrollbar-hide fixed top-24 right-8 z-10 max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) overflow-y-auto pb-1"
	>
		{@render railContent()}
	</div>
</aside>
