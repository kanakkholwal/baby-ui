<script lang="ts">
import { ChoroplethChart, type GeoCollection } from "@baby-ui/svelte";
import { ChartContainer } from "@baby-ui/svelte/chart";

// Any GeoJSON FeatureCollection; world-atlas plus topojson-client is a common source.
let { countries }: { countries: GeoCollection } = $props();

const values = { France: 72, Germany: 64, Spain: 58, Italy: 49 };
</script>

<ChartContainer config={{}} title="Adoption by country" aspect="wide">
	<ChoroplethChart
		data={countries}
		{values}
		projection="naturalEarth"
		zoomable
		labels={{ value: "Adoption" }}
	/>
</ChartContainer>
