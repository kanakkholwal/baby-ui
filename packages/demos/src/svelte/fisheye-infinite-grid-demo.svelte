<script lang="ts">
import {
	type FisheyeGridItem,
	FisheyeInfiniteGrid,
	type FisheyeInfiniteGridSize,
	type FisheyeInfiniteGridVariant,
} from "@baby-ui/svelte";
import { photo } from "../data/media";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const ITEMS: FisheyeGridItem[] = [
	{
		src: photo(1015, 480, 400),
		alt: "A river bending through a valley",
		title: "River Bend",
		caption: "01",
	},
	{
		src: photo(1016, 480, 400),
		alt: "Red canyon walls at dusk",
		title: "Canyon",
		caption: "02",
	},
	{
		src: photo(1018, 480, 400),
		alt: "Green highlands under cloud",
		title: "Highlands",
		caption: "03",
	},
	{
		src: photo(1019, 480, 400),
		alt: "A beach at low tide",
		title: "Low Tide",
		caption: "04",
	},
	{
		src: photo(1020, 480, 400),
		alt: "Snow on a mountain ridge",
		title: "Snowline",
		caption: "05",
	},
	{
		src: photo(1021, 480, 400),
		alt: "Fog over an open field",
		title: "Fog Field",
		caption: "06",
	},
	{
		src: photo(1022, 480, 400),
		alt: "Aurora over a dark lake",
		title: "Aurora",
		caption: "07",
	},
	{
		src: photo(1025, 480, 400),
		alt: "A pug wrapped in a blanket",
		title: "Pug Study",
		caption: "08",
	},
	{
		src: photo(1035, 480, 400),
		alt: "A waterfall in a forest",
		title: "Falls",
		caption: "09",
	},
	{
		src: photo(1039, 480, 400),
		alt: "Rapids between mossy rocks",
		title: "Rapids",
		caption: "10",
	},
];
</script>

<div class="w-full max-w-2xl">
	<FisheyeInfiniteGrid
		items={ITEMS}
		variant={(props.variant as FisheyeInfiniteGridVariant) ?? "card"}
		size={(props.size as FisheyeInfiniteGridSize) ?? "md"}
		lens={Number(props.lens ?? 0.8)}
		tileWidth={Number(props.tileWidth ?? 150)}
		tileHeight={Number(props.tileHeight ?? 180)}
		gap={Number(props.gap ?? 8)}
		inertia={Number(props.inertia ?? 0.94)}
	/>
</div>
