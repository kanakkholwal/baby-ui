<script lang="ts">
import { registry } from "virtual:docvia/source";
import { Renderer } from "@docvia/renderer-svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head><title>{data.page.data?.title ?? "Docs"} · Baby UI</title></svelte:head>

<main class="min-w-0 max-w-2xl py-8">
	<h1 class="font-semibold text-3xl text-foreground tracking-tight">{data.page.data?.title}</h1>
	{#if data.page.data?.description}
		<p class="mt-2 text-muted-foreground">{data.page.data.description}</p>
	{/if}
	<article class="prose-baby mt-8"><Renderer nodes={data.page.content} {registry} /></article>
</main>
