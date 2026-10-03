<script lang="ts">
import { IconAlignLeft } from "@baby-ui/icons";
import { TableOfContents } from "@baby-ui/svelte";
import type { Heading } from "#lib/docs-nodes.js";
import { productFor } from "#lib/products.js";
import PromoCard from "./promo-card.svelte";

let {
	slug,
	outline = [],
	heading = true,
	promo = true,
}: {
	slug: string;
	outline?: Heading[];
	/** Off inside a drawer that already titles itself "On this page". */
	heading?: boolean;
	/** Off where the page shows the sibling product elsewhere. */
	promo?: boolean;
} = $props();
</script>

<div class="flex flex-col gap-5">
	{#if outline.length}
		<div>
			{#if heading}
				<p class="mb-3 inline-flex items-center gap-1.5 text-muted-foreground text-sm">
					<IconAlignLeft size={16} />
					On this page
				</p>
			{/if}
			<TableOfContents items={outline} />
		</div>
	{/if}
	{#if promo}<PromoCard product={productFor(slug)} />{/if}
</div>
