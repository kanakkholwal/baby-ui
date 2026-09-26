<script lang="ts">
import {
	DraggableMarquee,
	type DraggableMarqueeDirection,
	type DraggableMarqueeGap,
} from "@baby-ui/svelte";
import { MARQUEE_TILES } from "../data/obsidian";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<DraggableMarquee
	speed={Number(props.speed ?? 1)}
	direction={(props.direction as DraggableMarqueeDirection) ?? "left"}
	gap={(props.gap as DraggableMarqueeGap) ?? "md"}
	pauseOnHover={(props.pauseOnHover as boolean) ?? false}
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
