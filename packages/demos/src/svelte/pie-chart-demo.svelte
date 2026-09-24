<script lang="ts">
import {
	ChartContainer,
	ChartLegend,
	PieChart,
	type PieHover,
	type PieVariant,
} from "@baby-ui/svelte";
import { CHANNELS, CHANNELS_CONFIG } from "../data/channels";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-sm">
	<ChartContainer config={CHANNELS_CONFIG} title="Traffic by channel" aspect="square">
		<PieChart
			data={CHANNELS}
			variant={(props.variant as PieVariant) ?? "donut"}
			hover={(props.hover as PieHover) ?? "translate"}
			hoverOffset={Number(props.hoverOffset ?? 10)}
			cornerRadius={Number(props.cornerRadius ?? 4)}
			labels={props.labels !== false}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
