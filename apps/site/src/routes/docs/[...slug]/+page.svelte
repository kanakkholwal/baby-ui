<script lang="ts">
import { Renderer } from "@docvia/renderer-svelte";
import IconList from "@tabler/icons-svelte/icons/list";
import { registry } from "$docvia/registry";
import MobileNavDrawer from "$lib/components/mobile-nav-drawer.svelte";
import OutlineToggle from "$lib/components/outline-toggle.svelte";
import PageMenu from "$lib/components/page-menu.svelte";
import PropsRail from "$lib/components/props-rail.svelte";
import Seo from "$lib/components/seo.svelte";
import { OUTLINE_PANEL, outlineSidebar } from "$lib/docs-sidebar.svelte";
import { articleLd, breadcrumbLd } from "$lib/seo";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const title = $derived(data.page.data?.title ?? "Docs");
const description = $derived(data.page.data?.description ?? "Baby UI documentation.");
const path = $derived(data.slug === "index" ? "/docs" : `/docs/${data.slug}`);
</script>

<Seo
	{title}
	{description}
	type="article"
	tag="Docs"
	keywords={data.page.data?.tags}
	noindex={data.page.data?.draft === true}
	markdown="/docs/{data.slug}.md"
	jsonLd={[
		articleLd({ title, description, path }),
		breadcrumbLd(
			path === "/docs"
				? [{ name: "Docs", path }]
				: [
						{ name: "Docs", path: "/docs" },
						{ name: title, path },
					],
		),
	]}
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
		<div class="flex shrink-0 items-center gap-2 self-start">
			<PageMenu
				markdownUrl="/docs/{data.slug}.md"
				copyText={data.page.data?.description ?? ""}
			/>
			<OutlineToggle />
		</div>
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
	<p class="mt-10 text-muted-foreground text-xs">
		<!-- A real link, not only the menu item: crawlers and agents follow it to the markdown twin. -->
		<a href="/docs/{data.slug}.md" class="underline decoration-border underline-offset-4 transition-colors hover:text-foreground">
			View this page as Markdown
		</a>
	</p>
</main>

<aside aria-label="On this page" class="hidden min-w-0 xl:block">
	<div
		id="outline-sidebar"
		inert={!outlineSidebar.current}
		class={["scrollbar-hide fixed top-24 right-8 z-10 max-h-[calc(100dvh-8rem)] w-(--right-sidebar-width) overflow-y-auto pb-1", OUTLINE_PANEL]}
	>
		{@render railContent()}
	</div>
</aside>
