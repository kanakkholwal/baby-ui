"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	ComposedChart,
	Line,
	SeriesBar,
	type SeriesBarVariant,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { REVENUE, REVENUE_CONFIG } from "../data/revenue";

type Props = Record<string, unknown>;

const config = REVENUE_CONFIG satisfies ChartConfig;

export function ComposedChartDemo({ props }: { props: Props }) {
	const barSize = Number(props.barSize ?? 0);
	const bar = {
		variant: (props.variant as SeriesBarVariant) ?? "solid",
		radius: Number(props.radius ?? 3),
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily sales">
				<ComposedChart
					data={REVENUE}
					stacked={props.stacked === true}
					barSize={barSize > 0 ? barSize : undefined}
					barGap={Number(props.barGap ?? 4)}
					status={(props.status as ChartStatus) ?? "ready"}
				>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<SeriesBar dataKey="online" {...bar} />
					<SeriesBar dataKey="store" {...bar} />
					<Line dataKey="target" curve="monotone" variant="dashed" fadeEdges={false} />
					<ChartTooltip />
				</ComposedChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
