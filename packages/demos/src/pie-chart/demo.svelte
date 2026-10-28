<script lang="ts">
import { ChartContainer, ChartLegend, PieChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { CHANNELS, CHANNELS_CONFIG } from "../data/channels";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof PieChart>>(props));
</script>

<div class="w-full max-w-sm">
	<ChartContainer config={CHANNELS_CONFIG} title="Traffic by channel" aspect="square">
		<PieChart
			data={CHANNELS}
			variant={p.variant ?? "donut"}
			hover={p.hover ?? "translate"}
			hoverOffset={Number(props.hoverOffset ?? 10)}
			cornerRadius={Number(props.cornerRadius ?? 4)}
			labels={props.labels !== false}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
