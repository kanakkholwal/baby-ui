"use client";

import {
	Area,
	AreaChart,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { fadeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;

export function AreaChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Area>>(props);
	const pChart = controlProps<ComponentProps<typeof AreaChart>>(props);
	const area = {
		variant: p.variant ?? "gradient",
		curve: p.curve ?? "natural",
		line: p.line ?? true,
		fillOpacity: p.fillOpacity ?? 0.4,
		fadeEdges: fadeProp(props.fadeEdges ?? "none"),
		loadingStyle: p.loadingStyle ?? "pulse",
		showMarkers: p.showMarkers ?? false,
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<AreaChart
					data={VISITORS}
					stacked={pChart.stacked ?? false}
					status={pChart.status ?? "ready"}
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
