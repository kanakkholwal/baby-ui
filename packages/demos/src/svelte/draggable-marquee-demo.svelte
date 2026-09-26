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
		<div class="flex h-32 w-48 flex-col justify-between rounded-2xl border border-border bg-card p-4">
			<span class="font-mono text-[11px] text-muted-foreground uppercase">{tile.meta}</span>
			<span class="font-medium text-foreground text-lg">{tile.title}</span>
		</div>
	{/each}
</DraggableMarquee>
