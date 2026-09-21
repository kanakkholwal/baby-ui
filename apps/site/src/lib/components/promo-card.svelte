<script lang="ts">
import IconArrowUpRight from "@tabler/icons-svelte/icons/arrow-up-right";
import type { Product } from "$lib/products";

let { product }: { product: Product } = $props();
</script>

<aside aria-label="More from Nexonauts" class="rounded-2xl border border-border bg-card p-1.5">
	<div
		class="grid h-20 place-items-center rounded-[calc(1rem-0.375rem)] border border-border bg-background text-foreground"
	>
		<span class="flex items-center gap-2">
			<span class="font-semibold text-lg tracking-tight">{product.name}</span>
			<span
				class="rounded-md border border-border px-1.5 py-0.5 font-medium text-[10px] text-muted-foreground"
			>
				{product.tag}
			</span>
		</span>
	</div>
	<div class="px-2 pt-2.5 pb-1.5">
		<p class="font-medium text-foreground text-sm">{product.headline}</p>
		<p class="mt-0.5 text-muted-foreground text-xs leading-relaxed">{product.blurb}</p>
		<a
			href={product.href}
			target="_blank"
			rel="noreferrer"
			class="mt-3 inline-flex h-8 w-full items-center justify-center gap-1 rounded-lg border border-border bg-background font-medium text-foreground text-xs transition-colors hover:bg-foreground/[0.06]"
		>
			Explore {product.name}
			<IconArrowUpRight size={13} stroke={2} />
		</a>
		<p class="mt-2 text-[10px] text-muted-foreground">From nexonauts.com</p>
	</div>
</aside>
