<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	type ChartStatus,
	ChartTooltip,
	Line,
	LineChart,
	type SeriesLoadingStyle,
	type SeriesMarkerAppearance,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const config = { desktop: VISITORS_CONFIG.desktop };
const data = VISITORS.slice(-12);
</script>

<div class="w-full max-w-3xl">
	<ChartContainer {config} title="Daily visitors">
		<LineChart {data} status={(props.status as ChartStatus) ?? "loading"}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line
				dataKey="desktop"
				curve="monotone"
				showMarkers
				terminalMarker
				dashFromIndex={9}
				markerAppearance={(props.markerAppearance as SeriesMarkerAppearance) ?? "ring"}
				loadingStyle={(props.loadingStyle as SeriesLoadingStyle) ?? "pulse"}
			/>
			<ChartTooltip />
		</LineChart>
	</ChartContainer>
</div>
