<script lang="ts">
import { ChartContainer, ChartLegend, SunburstChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { REVENUE_TREE, REVENUE_TREE_CONFIG } from "../data/revenue-tree";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SunburstChart>>(props));
</script>

<div class="w-full max-w-md">
	<ChartContainer config={REVENUE_TREE_CONFIG} title="Revenue by region" aspect="square">
		<SunburstChart
			data={REVENUE_TREE}
			variant={p.variant ?? "sunburst"}
			labels={props.labels !== false}
			breadcrumb={props.breadcrumb !== false}
			hoverPop={Number(props.hoverPop ?? 8)}
			staggerScale={Number(props.staggerScale ?? 1)}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
