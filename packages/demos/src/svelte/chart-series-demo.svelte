<script lang="ts">
import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof Line>>(props));
const pLine = $derived(controlProps<ComponentProps<typeof LineChart>>(props));

const config = { desktop: VISITORS_CONFIG.desktop };
const data = VISITORS.slice(-12);
</script>

<div class="w-full max-w-3xl">
	<ChartContainer {config} title="Daily visitors">
		<LineChart {data} status={pLine.status ?? "loading"}>
			<CartesianGrid />
			<YAxis />
			<XAxis />
			<Line
				dataKey="desktop"
				curve="monotone"
				showMarkers
				terminalMarker
				dashFromIndex={9}
				markerAppearance={p.markerAppearance ?? "ring"}
				loadingStyle={p.loadingStyle ?? "pulse"}
			/>
			<ChartTooltip />
		</LineChart>
	</ChartContainer>
</div>
