<script lang="ts">
import {
	PixelCanvas,
	type PixelCanvasTone,
	type PixelCanvasVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="relative h-80 w-full max-w-2xl overflow-hidden rounded-xl border border-border">
	<PixelCanvas
		position="absolute"
		variant={(props.variant as PixelCanvasVariant) ?? "default"}
		tone={(props.tone as PixelCanvasTone) ?? "spectrum"}
		gap={Number(props.gap ?? 8)}
		decay={Number(props.decay ?? 0.04)}
		radius={Number(props.radius ?? 90)}
	>
		<div class="grid size-full place-items-center">
			<p class="font-semibold text-2xl text-foreground">Built on baby ui</p>
		</div>
	</PixelCanvas>
</div>
