<script lang="ts">
import type { OgPngPreview } from "$lib/preview-modes.svelte";

let { preview, name }: { preview: OgPngPreview; name: string } = $props();
</script>

<figure class="relative w-full max-w-3xl">
	{#if preview.shown}
		<img
			src={preview.shown}
			alt="Rendered 1200x630 PNG of {name}"
			width="1200"
			height="630"
			class={["h-auto w-full rounded-xl border border-border shadow-sm transition-opacity", preview.pending && "opacity-60"]}
		/>
	{:else}
		<div class="grid aspect-[1200/630] w-full place-items-center rounded-xl border border-border bg-card text-muted-foreground text-sm">
			Rendering…
		</div>
	{/if}
	<figcaption class="mt-2 text-center text-muted-foreground text-xs">
		Rendered with takumi at 1200x630: exactly what social networks receive.
	</figcaption>
</figure>
