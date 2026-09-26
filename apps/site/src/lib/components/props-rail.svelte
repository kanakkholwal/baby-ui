<script lang="ts">
import { TableOfContents } from "@baby-ui/svelte";
import IconAlignLeft from "@tabler/icons-svelte/icons/align-left";
import type { Heading } from "$lib/docs-nodes";
import { productFor } from "$lib/products";
import PromoCard from "./promo-card.svelte";

let {
	slug,
	outline = [],
	heading = true,
}: {
	slug: string;
	outline?: Heading[];
	/** Off inside a drawer that already titles itself "On this page". */
	heading?: boolean;
} = $props();
</script>

<div class="flex flex-col gap-5">
	{#if outline.length}
		<div>
			{#if heading}
				<p class="mb-3 inline-flex items-center gap-1.5 text-muted-foreground text-sm">
					<IconAlignLeft size={16} stroke={1.6} />
					On this page
				</p>
			{/if}
			<TableOfContents items={outline} />
		</div>
	{/if}
	<PromoCard product={productFor(slug)} />
</div>
