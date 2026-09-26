<script lang="ts">
import {
	ScrollTiltedGrid,
	type ScrollTiltedGridAspect,
	type ScrollTiltedGridRadius,
	type ScrollTiltedGridSize,
} from "@baby-ui/svelte";
import { TILTED_IMAGES } from "../data/stacks";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<ScrollTiltedGrid
	images={TILTED_IMAGES}
	size={(props.size as ScrollTiltedGridSize) ?? "md"}
	aspect={(props.aspect as ScrollTiltedGridAspect) ?? "portrait"}
	radius={(props.radius as ScrollTiltedGridRadius) ?? "sm"}
	maxTilt={Number(props.maxTilt ?? 62)}
	maxBlur={Number(props.maxBlur ?? 7)}
	perspective={Number(props.perspective ?? 1000)}
	repeat={Number(props.repeat ?? 1)}
	class="max-w-3xl"
/>
