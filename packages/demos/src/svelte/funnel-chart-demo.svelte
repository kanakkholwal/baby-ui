<script lang="ts">
import {
	ChartContainer,
	FunnelChart,
	type FunnelEdges,
	type FunnelLabelLayout,
	type FunnelOrientation,
	type FunnelPattern,
} from "@baby-ui/svelte";
import { SIGNUP_FUNNEL } from "../data/revenue-tree";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const orientation = $derived((props.orientation as FunnelOrientation) ?? "horizontal");
</script>

<div class={orientation === "vertical" ? "w-full max-w-sm" : "w-full max-w-3xl"}>
	<ChartContainer
		config={{}}
		title="Signup funnel"
		aspect={orientation === "vertical" ? "square" : "wide"}
	>
		<FunnelChart
			data={SIGNUP_FUNNEL}
			{orientation}
			edges={(props.edges as FunnelEdges) ?? "curved"}
			labelLayout={(props.labelLayout as FunnelLabelLayout) ?? "spread"}
			pattern={(props.pattern as FunnelPattern) ?? "none"}
			layers={Number(props.layers ?? 3)}
			gap={Number(props.gap ?? 4)}
			grid={props.grid === true}
			showValues={props.showValues !== false}
			showPercentage={props.showPercentage !== false}
			showLabels={props.showLabels !== false}
		/>
	</ChartContainer>
</div>
