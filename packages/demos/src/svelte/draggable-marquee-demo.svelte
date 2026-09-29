<script lang="ts">
import { DraggableMarquee } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { MARQUEE_TILES } from "../data/obsidian";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof DraggableMarquee>>(props));
</script>

<DraggableMarquee
	speed={Number(props.speed ?? 1)}
	direction={p.direction ?? "left"}
	gap={p.gap ?? "md"}
	pauseOnHover={p.pauseOnHover ?? false}
>
	{#each MARQUEE_TILES as tile (tile.title)}
		<figure class="w-56">
			<img
				src={tile.src}
				alt={tile.title}
				loading="lazy"
				class="aspect-[3/2] w-full rounded-2xl border border-border object-cover"
			/>
			<figcaption class="mt-2 flex justify-between text-sm">
				<span class="font-medium text-foreground">{tile.title}</span>
				<span class="text-muted-foreground">{tile.meta}</span>
			</figcaption>
		</figure>
	{/each}
</DraggableMarquee>
