<script lang="ts">
import { IconArrowLeft } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
import CardGallery from "#lib/components/card-gallery.svelte";
import PmCommand from "#lib/components/pm-command.svelte";
import Seo from "#lib/components/seo.svelte";
import { packArgs } from "#lib/install.js";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();
</script>

<Seo title="{data.pack.label} pack" description={data.pack.blurb} />

<main class="w-full min-w-0 py-6 xl:col-span-2">
	<header class="flex flex-col gap-4 pt-6 pb-6">
		<Button href="/packs" variant="ghost" size="sm" class="-ms-2.5 self-start rounded-full text-muted-foreground">
			<IconArrowLeft aria-hidden="true" />
			Packs
		</Button>
		<div class="flex flex-col gap-1.5">
			<h1 class="m-0 font-display font-medium text-3xl text-foreground tracking-tight">{data.pack.label}</h1>
			<p class="m-0 max-w-xl text-pretty text-muted-foreground text-sm">{data.pack.blurb}</p>
		</div>
	</header>

	<section aria-labelledby="install" class="flex max-w-2xl flex-col gap-2">
		<h2 id="install" class="sr-only">Install</h2>
		<PmCommand kind="dlx" args={packArgs(data.pack.id)} highlight="pack add {data.pack.id}" />
		<p class="m-0 px-1 text-muted-foreground text-xs">
			Adds all {data.items.length} components and what they depend on. Run it in a project with components.json.
		</p>
	</section>

	<section aria-labelledby="included" class="mt-10 flex flex-col gap-3">
		<h2 id="included" class="m-0 flex items-baseline gap-2 font-medium text-base text-foreground tracking-tight">
			Included
			<span class="text-muted-foreground text-xs tabular-nums">{data.items.length}</span>
		</h2>
		<CardGallery items={data.items} mode="grid" />
	</section>

	<nav aria-labelledby="more-packs" class="mt-12 flex flex-col gap-3">
		<h2 id="more-packs" class="m-0 font-medium text-base text-foreground tracking-tight">More packs</h2>
		<ul class="m-0 flex list-none flex-wrap gap-2 p-0">
			{#each data.others as other (other.id)}
				<li>
					<Button href="/packs/{other.id}" variant="secondary" size="sm" class="rounded-full">{other.label}</Button>
				</li>
			{/each}
		</ul>
	</nav>
</main>
