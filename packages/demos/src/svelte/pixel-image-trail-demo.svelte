<script lang="ts">
import {
	PixelImageTrail,
	type PixelImageTrailSize,
	type PixelImageTrailVariant,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<PixelImageTrail
	src="https://picsum.photos/id/1015/1200/800"
	alt="A river winding through a mountain valley"
	variant={(props.variant as PixelImageTrailVariant) ?? "fade"}
	size={(props.size as PixelImageTrailSize) ?? "md"}
	pixelSize={Number(props.pixelSize ?? 36)}
	fadeDuration={Number(props.fadeDuration ?? 900)}
	maxPixels={Number(props.maxPixels ?? 84)}
	initialPixels={Number(props.initialPixels ?? 24)}
	radius={Number(props.radius ?? 40)}
	class="max-w-3xl"
/>
