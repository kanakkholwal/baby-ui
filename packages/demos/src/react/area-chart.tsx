"use client";

import {
	Area,
	AreaChart,
	type AreaVariant,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	type LineCurve,
	type SeriesLoadingStyle,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;

export function AreaChartDemo({ props }: { props: Props }) {
	const area = {
		variant: (props.variant as AreaVariant) ?? "gradient",
		curve: (props.curve as LineCurve) ?? "natural",
		line: props.line !== false,
		fillOpacity: Number(props.fillOpacity ?? 0.4),
		fadeEdges: fadeProp(props.fadeEdges ?? "none"),
		loadingStyle: (props.loadingStyle as SeriesLoadingStyle) ?? "pulse",
		showMarkers: props.showMarkers === true,
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<AreaChart
					data={VISITORS}
					stacked={props.stacked === true}
					status={(props.status as ChartStatus) ?? "ready"}
				>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Area dataKey="mobile" {...area} />
					<Area dataKey="desktop" {...area} />
					<ChartTooltip />
				</AreaChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
