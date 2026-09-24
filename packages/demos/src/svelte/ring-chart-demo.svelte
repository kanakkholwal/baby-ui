<script lang="ts">
import { ChartContainer, ChartLegend, type RingCap, RingChart } from "@baby-ui/svelte";
import { GOALS, GOALS_CONFIG } from "../data/channels";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<div class="w-full max-w-sm">
	<ChartContainer config={GOALS_CONFIG} title="Daily goals" aspect="square">
		<RingChart
			data={GOALS}
			cap={(props.cap as RingCap) ?? "round"}
			track={props.track !== false}
			strokeWidth={Number(props.strokeWidth ?? 12)}
			gap={Number(props.gap ?? 6)}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
