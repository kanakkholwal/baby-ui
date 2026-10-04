<script lang="ts">
import {
	backgroundCss,
	layerCss,
	OG_HEIGHT,
	OG_WIDTH,
	type OgDoc,
	styleString,
} from "./og-canvas";

let { doc }: { doc: OgDoc } = $props();

let width = $state(0);
const scale = $derived(width / OG_WIDTH);
</script>

<!-- A still, inert render of a card filling its parent's width, from the editor's own CSS. -->
<div
	aria-hidden="true"
	bind:clientWidth={width}
	class="relative aspect-[1200/630] w-full overflow-hidden rounded-md ring-1 ring-border"
>
	{#if width}
		<div
			inert
			class={["pointer-events-none absolute top-0 left-0 origin-top-left text-foreground", doc.background.dark && "dark"]}
			style="width:{OG_WIDTH}px;height:{OG_HEIGHT}px;scale:{scale};{styleString(backgroundCss(doc.background))}"
		>
			{#each doc.layers as layer (layer.id)}
				{#if !layer.hidden}
					{#if layer.kind === "text"}
						<p style={styleString(layerCss(layer))}>{layer.text}</p>
					{:else if layer.kind === "image"}
						<img src={layer.src} alt="" loading="lazy" style={styleString(layerCss(layer))} />
					{:else}
						<div style={styleString(layerCss(layer))}></div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}
</div>
