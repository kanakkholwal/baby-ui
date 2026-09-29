<script lang="ts">
import { ChartContainer, FunnelChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { SIGNUP_FUNNEL } from "../data/revenue-tree";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof FunnelChart>>(props));

const orientation = $derived(p.orientation ?? "horizontal");
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
			edges={p.edges ?? "curved"}
			labelLayout={p.labelLayout ?? "spread"}
			pattern={p.pattern ?? "none"}
			layers={Number(props.layers ?? 3)}
			gap={Number(props.gap ?? 4)}
			grid={props.grid === true}
			showValues={props.showValues !== false}
			showPercentage={props.showPercentage !== false}
			showLabels={props.showLabels !== false}
		/>
	</ChartContainer>
</div>
