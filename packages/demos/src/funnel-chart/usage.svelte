<script lang="ts">
import { FunnelChart } from "@baby-ui/svelte";
import { ChartContainer } from "@baby-ui/svelte/chart";

const data = [
	{ label: "Visitors", value: 12400 },
	{ label: "Signed up", value: 5310 },
	{ label: "Activated", value: 2860 },
	{ label: "Subscribed", value: 940 },
];
</script>

<ChartContainer config={{}} title="Signup funnel" aspect="wide">
	<FunnelChart {data} edges="straight" />
</ChartContainer>
