<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import Seo from "#lib/components/seo.svelte";
import type { PageProps } from "./$types";

let { data }: PageProps = $props();

const SHOWN = 5;
</script>

<Seo
	title="Packs"
	description="Components grouped by the screen they build, each installed with one command."
/>

<main class="w-full min-w-0 py-6 xl:col-span-2">
	<header class="flex flex-col gap-1.5 pt-6 pb-6">
		<h1 class="m-0 font-display font-medium text-3xl text-foreground tracking-tight">Packs</h1>
		<p class="m-0 max-w-xl text-pretty text-muted-foreground text-sm">
			Components that build one kind of screen together. Install a whole pack with one command.
		</p>
	</header>

	<ul class="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-3 p-0">
		{#each data.packs as pack (pack.id)}
			<li class="contents">
				<a
					href="/packs/{pack.id}"
					class="group flex flex-col rounded-2xl border border-border bg-card p-1 text-foreground no-underline transition-[border-color] duration-(--duration-fast) hover:border-foreground/20 motion-reduce:transition-none"
				>
					<div class="flex flex-1 flex-col gap-3 rounded-[11px] border border-border bg-background p-4">
						<div class="flex flex-col gap-1">
							<h2 class="m-0 font-medium text-base tracking-tight">{pack.label}</h2>
							<p class="m-0 line-clamp-2 text-pretty text-muted-foreground text-sm">{pack.blurb}</p>
						</div>
						<ul class="m-0 mt-auto flex list-none flex-wrap gap-1.5 p-0">
							{#each pack.names.slice(0, SHOWN) as name (name)}
								<li class="rounded-full bg-muted px-2 py-0.5 text-muted-foreground text-xs">{name}</li>
							{/each}
							{#if pack.names.length > SHOWN}
								<li class="rounded-full px-1 py-0.5 text-muted-foreground text-xs">+{pack.names.length - SHOWN} more</li>
							{/if}
						</ul>
					</div>
					<div class="flex items-center justify-between gap-3 px-2.5 pt-2 pb-1 text-muted-foreground text-xs">
						<span class="tabular-nums">{pack.names.length} components</span>
						<span class="inline-flex items-center gap-1 text-foreground">
							Open
							<IconArrowRight
								size={13}
								aria-hidden="true"
								class="transition-transform duration-(--duration-fast) group-hover:translate-x-0.5 motion-reduce:transition-none"
							/>
						</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</main>
