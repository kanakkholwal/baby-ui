<script lang="ts">
import { ImageTrail, type ImageTrailSize, type ImageTrailVariant } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const images = [10, 11, 15, 16, 17, 20, 28, 29].map(
	(id) => `https://picsum.photos/id/${id}/300/400`,
);
</script>

<ImageTrail
	{images}
	variant={(props.variant as ImageTrailVariant) ?? "fall"}
	size={(props.size as ImageTrailSize) ?? "md"}
	threshold={Number(props.threshold ?? 80)}
	duration={Number(props.duration ?? 1600)}
	class="w-full max-w-3xl rounded-xl border border-border"
>
	<p class="text-muted-foreground text-sm">Move the pointer here</p>
</ImageTrail>
