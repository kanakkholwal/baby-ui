<script lang="ts">
import {
	WheelCarousel,
	type WheelCarouselAspect,
	type WheelCarouselPhotoSide,
	type WheelCarouselSize,
} from "@baby-ui/svelte";
import { WHEEL_ITEMS } from "../data/wheel";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<WheelCarousel
	items={WHEEL_ITEMS}
	photoSide={(props.photoSide as WheelCarouselPhotoSide) ?? "left"}
	aspect={(props.aspect as WheelCarouselAspect) ?? "3/4"}
	size={(props.size as WheelCarouselSize) ?? "md"}
	visibleItems={Number(props.visibleItems ?? 7)}
	spacing={Number(props.spacing ?? 14)}
	radius={Number(props.radius ?? 320)}
	snap={(props.snap as boolean) ?? true}
	momentum={(props.momentum as boolean) ?? true}
	showMarker={(props.showMarker as boolean) ?? true}
	photoWidth={32}
	class="h-[420px]"
/>
