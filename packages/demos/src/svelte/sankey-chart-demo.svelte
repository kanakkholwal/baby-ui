<script lang="ts">
import {
	ChartContainer,
	SankeyChart,
	type SankeyLinkColor,
	type SankeyOrientation,
} from "@baby-ui/svelte";
import { TRAFFIC_FLOWS } from "../data/flows";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const orientation = $derived((props.orientation as SankeyOrientation) ?? "horizontal");
</script>

<div class="w-full max-w-3xl">
	<ChartContainer
		config={{}}
		title="Visitor journeys"
		aspect={orientation === "vertical" ? "square" : "wide"}
	>
		<SankeyChart
			data={TRAFFIC_FLOWS}
			{orientation}
			linkColor={(props.linkColor as SankeyLinkColor) ?? "gradient"}
			labels={props.labels !== false}
			nodeWidth={Number(props.nodeWidth ?? 16)}
			nodePadding={Number(props.nodePadding ?? 24)}
		/>
	</ChartContainer>
</div>
