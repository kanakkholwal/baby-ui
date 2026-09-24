<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	type ChartMarkerAppearance,
	type ChartMarkerSize,
	ChartMarkers,
	ChartMarkerTooltip,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { EVENTS } from "../data/events";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const markers = EVENTS.map((event, i) =>
	i === 0
		? { ...event, href: "https://github.com/bklit/bklit-ui", target: "_blank" as const }
		: event,
);
</script>

<div class="w-full max-w-3xl pt-6">
	<ChartContainer config={VISITORS_CONFIG} title="Daily visitors with release notes">
		<LineChart data={VISITORS} margin={{ top: 32 }}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line dataKey="desktop" />
			<ChartMarkers
				items={markers}
				size={(props.size as ChartMarkerSize) ?? "md"}
				appearance={(props.appearance as ChartMarkerAppearance) ?? "solid"}
				showLines={props.showLines !== false}
			/>
			<ChartTooltip>
				{#snippet content()}
					<ChartTooltipContent />
					<ChartMarkerTooltip items={markers} />
				{/snippet}
			</ChartTooltip>
		</LineChart>
	</ChartContainer>
</div>
