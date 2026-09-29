<script lang="ts">
import { LogoCarousel } from "@baby-ui/svelte";
import type { ComponentProps, Snippet } from "svelte";
import { BRANDS } from "../data/media";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof LogoCarousel>>(props));
</script>

{#snippet logo(item: unknown)}
	{@const brand = item as (typeof BRANDS)[number]}
	<span class="flex h-10 w-28 items-center justify-center gap-2 text-muted-foreground">
		<span
			role="img"
			aria-label={brand.name}
			class="size-6 bg-current"
			style:mask="url({brand.logo}) center / contain no-repeat"
		></span>
		<span class="font-medium text-sm">{brand.name}</span>
	</span>
{/snippet}

<LogoCarousel
	items={BRANDS}
	logo={logo as Snippet<[unknown]>}
	columnCount={Number(props.columnCount ?? 4)}
	direction={p.direction ?? "ltr"}
	class="w-full max-w-lg gap-3"
/>
