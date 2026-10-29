<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import { Button } from "@baby-ui/svelte";
import type { CardItem } from "#lib/registry.js";
import CardGallery from "./card-gallery.svelte";

let { items, count }: { items: CardItem[]; count: number } = $props();
</script>

<section aria-labelledby="home-new-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 id="home-new-heading" class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl">Just landed</h2>
			<p class="mt-2 text-muted-foreground">
				{count} components landed in the last 15 days.
			</p>
		</div>
		<Button href="/components#new" variant="ghost" size="sm" class="group">
			See all new
			<IconArrowRight
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</Button>
	</div>

	<div class="mt-8"><CardGallery {items} mode="grid" /></div>
</section>
