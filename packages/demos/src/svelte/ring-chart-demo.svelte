<script lang="ts">
import { ChartContainer, ChartLegend, RingChart } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { GOALS, GOALS_CONFIG } from "../data/channels";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof RingChart>>(props));
</script>

<div class="w-full max-w-sm">
	<ChartContainer config={GOALS_CONFIG} title="Daily goals" aspect="square">
		<RingChart
			data={GOALS}
			cap={p.cap ?? "round"}
			track={props.track !== false}
			strokeWidth={Number(props.strokeWidth ?? 12)}
			gap={Number(props.gap ?? 6)}
		/>
		<ChartLegend />
	</ChartContainer>
</div>
