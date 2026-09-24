<script lang="ts">
import { type GeoCollection, StatCardMap } from "@baby-ui/svelte";

let { countries }: { countries: GeoCollection } = $props();
</script>

<StatCardMap
	title="Visitors"
	geo={countries}
	values={{ Brazil: 1840, India: 3120, Japan: 960 }}
	value={5920}
	label="All countries"
	trend={8.4}
/>
