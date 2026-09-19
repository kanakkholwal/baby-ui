<script lang="ts">
import { registry } from "virtual:docvia/source";
import { Renderer } from "@docvia/renderer-svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<svelte:head><title>{data.page.data?.title ?? "Docs"} — baby-ui</title></svelte:head>

<main class="mx-auto max-w-2xl px-6 py-12">
	<h1 class="mb-4 font-semibold text-3xl tracking-tight">{data.page.data?.title}</h1>
	<article class="prose-baby"><Renderer nodes={data.page.content} {registry} /></article>
</main>
