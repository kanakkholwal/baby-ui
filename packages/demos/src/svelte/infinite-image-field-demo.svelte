<script lang="ts">
import {
	InfiniteImageField,
	type InfiniteImageFieldLayout,
	type InfiniteImageFieldShape,
	type InfiniteImageFieldSize,
} from "@baby-ui/svelte";
import { photo } from "../data/media";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const IMAGES = [
	1015, 1016, 1018, 1019, 1020, 1021, 1022, 1025, 1035, 1039, 1043, 1044,
].map((id) => photo(id, 320, 440));
</script>

<div class="w-full max-w-2xl">
	<InfiniteImageField
		images={IMAGES}
		shape={(props.shape as InfiniteImageFieldShape) ?? "rounded"}
		layout={(props.layout as InfiniteImageFieldLayout) ?? "grid"}
		size={(props.size as InfiniteImageFieldSize) ?? "md"}
		imageWidth={Number(props.imageWidth ?? 160)}
		imageHeight={Number(props.imageHeight ?? 220)}
		gap={Number(props.gap ?? 24)}
		maxSpeed={Number(props.maxSpeed ?? 5)}
		smoothing={Number(props.smoothing ?? 0.07)}
	/>
</div>
