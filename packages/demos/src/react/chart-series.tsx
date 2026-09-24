"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	type ChartStatus,
	ChartTooltip,
	Line,
	LineChart,
	type SeriesLoadingStyle,
	type SeriesMarkerAppearance,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = { desktop: VISITORS_CONFIG.desktop } satisfies ChartConfig;
const data = VISITORS.slice(-12);

export function ChartSeriesDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<LineChart data={data} status={(props.status as ChartStatus) ?? "loading"}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line
						dataKey="desktop"
						curve="monotone"
						showMarkers
						terminalMarker
						dashFromIndex={9}
						markerAppearance={
							(props.markerAppearance as SeriesMarkerAppearance) ?? "ring"
						}
						loadingStyle={(props.loadingStyle as SeriesLoadingStyle) ?? "pulse"}
					/>
					<ChartTooltip />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
