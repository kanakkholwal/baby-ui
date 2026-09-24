<script lang="ts">
import {
	type ChoroplethProjection,
	StatCardMap,
	type StatCardMapSize,
} from "@baby-ui/svelte";
import { MAP_TOTAL, MAP_TRENDS } from "../data/stat";
import { WORLD, WORLD_VALUES } from "../data/world";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-2xl">
	<StatCardMap
		title="Sample index"
		geo={WORLD}
		values={WORLD_VALUES}
		trends={MAP_TRENDS}
		value={MAP_TOTAL}
		label="All countries"
		trend={8.4}
		projection={(props.projection as ChoroplethProjection) ?? "equalEarth"}
		size={(props.size as StatCardMapSize) ?? "md"}
	/>
</div>
