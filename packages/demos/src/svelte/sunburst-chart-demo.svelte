<script lang="ts">
import {
	ChartContainer,
	ChartLegend,
	SunburstChart,
	type SunburstVariant,
} from "@baby-ui/svelte";
import { REVENUE_TREE, REVENUE_TREE_CONFIG } from "../data/revenue-tree";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-md">
	<ChartContainer config={REVENUE_TREE_CONFIG} title="Revenue by region" aspect="square">
		<SunburstChart
			data={REVENUE_TREE}
			variant={(props.variant as SunburstVariant) ?? "sunburst"}
			labels={props.labels !== false}
			breadcrumb={props.breadcrumb !== false}
			hoverPop={Number(props.hoverPop ?? 8)}
			staggerScale={Number(props.staggerScale ?? 1)}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
