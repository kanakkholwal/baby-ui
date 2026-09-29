<script lang="ts">
import { ChartContainer, SankeyChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { TRAFFIC_FLOWS } from "../data/flows";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof SankeyChart>>(props));

const orientation = $derived(p.orientation ?? "horizontal");
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
			linkColor={p.linkColor ?? "gradient"}
			labels={props.labels !== false}
			nodeWidth={Number(props.nodeWidth ?? 16)}
			nodePadding={Number(props.nodePadding ?? 24)}
		/>
	</ChartContainer>
</div>
