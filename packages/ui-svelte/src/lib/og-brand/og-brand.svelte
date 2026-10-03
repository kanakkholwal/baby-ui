<script lang="ts">
import { cn } from "../lib/cn";
import {
	OG_BRAND_MOSAIC,
	OG_BRAND_PIPES,
	OG_BRAND_SCATTER,
	OG_BRAND_WAVES,
	type OgBrandMode,
	type OgBrandVariant,
	ogBrand,
	ogBrandBand,
} from "./variants";

let {
	name,
	logo,
	tagline,
	images,
	mode = "light",
	variant = "plain",
	class: className,
}: {
	/** Brand name, set as the wordmark. */
	name: string;
	/** Logo image URL beside (or, in `mosaic`, above) the name. */
	logo?: string;
	/** One quiet line under the wordmark. */
	tagline?: string;
	/** Image URLs for `scatter` tiles, `mosaic` columns and the `split` panel; they cycle. */
	images?: string[];
	mode?: OgBrandMode;
	variant?: OgBrandVariant;
	class?: string;
} = $props();

const s = $derived(ogBrand({ mode, variant }));
const pics = $derived(images?.filter(Boolean) ?? []);
const pick = (i: number) => pics[i % pics.length];
const box = (b: { left: number; top: number; width: number; height: number }) =>
	`left:${b.left}px;top:${b.top}px;width:${b.width}px;height:${b.height}px`;
</script>

<div data-slot="og-brand" class={cn(s.root(), className)}>
	{#if variant === "waves"}
		<svg
			viewBox="0 0 1200 630"
			fill="none"
			stroke="currentColor"
			stroke-width="1.25"
			class={s.field()}
			aria-hidden="true"
		>
			{#each OG_BRAND_WAVES as d (d)}<path {d} />{/each}
		</svg>
		<div class={s.hairX()}></div>
		<div class={s.hairY()}></div>
	{:else if variant === "pipes"}
		<div class={s.dots()}></div>
		{#each OG_BRAND_PIPES as band (`${band.left}-${band.top}`)}
			<div
				class={ogBrandBand({ side: band.side, slot: band.slot })}
				style="{box(band)};border-{band.side === 'lb' ? 'bottom' : 'top'}-left-radius:{band.radius}px"
			></div>
		{/each}
	{:else if variant === "mesh" || variant === "blur"}
		<div class={s.blobA()}></div>
		<div class={s.blobB()}></div>
		<div class={s.blobC()}></div>
		{#if variant === "mesh"}
			<div class={s.sheen()}></div>
			<div class={s.veil()}></div>
		{/if}
	{:else if pics.length && variant === "scatter"}
		{#each OG_BRAND_SCATTER as tile, i (`${tile.left}-${tile.top}`)}
			<img src={pick(i)} alt="" class={cn(s.tile(), tile.soft && s.softTile())} style={box(tile)} />
		{/each}
	{:else if pics.length && variant === "mosaic"}
		{#each OG_BRAND_MOSAIC as tile, i (`${tile.left}-${tile.top}`)}
			<img src={pick(i)} alt="" class={s.tile()} style={box(tile)} />
		{/each}
	{:else if pics.length && variant === "split"}
		<img src={pick(0)} alt="" class={s.panel()} />
	{/if}
	<div class={s.mark()}>
		<div class={s.wordmark()}>
			{#if logo}<img src={logo} alt="" class={s.logo()} />{/if}
			<span class={s.name()}>{name}</span>
		</div>
		{#if tagline}<p class={s.tagline()}>{tagline}</p>{/if}
	</div>
</div>
