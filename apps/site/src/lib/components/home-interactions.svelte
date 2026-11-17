<script lang="ts">
import { IconArrowRight } from "@baby-ui/icons";
import type { CardItem } from "#lib/registry.js";
import CardGallery from "./card-gallery.svelte";

let { items }: { items: CardItem[] } = $props();
</script>

<!-- Live micro-interactions: press, hold, drag and type to try each one. -->
<section aria-labelledby="home-interactions-heading" class="mx-auto max-w-7xl px-4 pb-24 md:px-8">
	<div class="flex flex-wrap items-end justify-between gap-4">
		<h2
			id="home-interactions-heading"
			class="m-0 font-display font-medium text-3xl text-foreground tracking-[-0.03em] md:text-4xl"
		>
			Micro-interactions
		</h2>
		<a
			href="/components/advanced"
			class="group inline-flex items-center gap-1.5 rounded-md font-medium text-muted-foreground text-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
		>
			All advanced components
			<IconArrowRight
				size={14}
				aria-hidden="true"
				class="transition-transform duration-150 group-hover:translate-x-0.5 motion-reduce:transition-none"
			/>
		</a>
	</div>
	<div class="mt-8"><CardGallery {items} mode="grid" /></div>
</section>
