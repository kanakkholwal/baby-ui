<script lang="ts">
import {
	ChartContainer,
	ChoroplethChart,
	type ChoroplethProjection,
} from "@baby-ui/svelte";
import { WORLD, WORLD_VALUES } from "../data/world";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-3xl">
	<ChartContainer config={{}} title="Sample index by country" aspect="wide">
		<ChoroplethChart
			data={WORLD}
			values={WORLD_VALUES}
			projection={(props.projection as ChoroplethProjection) ?? "equalEarth"}
			graticule={props.graticule !== false}
			legend={props.legend !== false}
			zoomable={props.zoomable === true}
			dimOpacity={Number(props.dimOpacity ?? 0.4)}
			labels={{ value: "Index" }}
		/>
	</ChartContainer>
</div>
