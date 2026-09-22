<script lang="ts">
import type { Heading } from "$lib/docs-nodes";
import { productFor } from "$lib/products";
import OutlineNav from "./outline-nav.svelte";
import PromoCard from "./promo-card.svelte";

let { slug, outline = [] }: { slug: string; outline?: Heading[] } = $props();
</script>

<div class="flex flex-col gap-5">
	{#if outline.length}
		<div>
			<p class="mb-2 px-1 font-medium text-[10px] text-muted-foreground uppercase tracking-[0.14em]">
				On this page
			</p>
			<OutlineNav headings={outline} />
		</div>
	{/if}
	<PromoCard product={productFor(slug)} />
</div>
