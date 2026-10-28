"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ComposedChart,
	Line,
	SeriesBar,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { REVENUE, REVENUE_CONFIG } from "../data/revenue";

type Props = Record<string, unknown>;

const config = REVENUE_CONFIG satisfies ChartConfig;

export function ComposedChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ComposedChart>>(props);
	const pBar = controlProps<ComponentProps<typeof SeriesBar>>(props);
	const barSize = p.barSize ?? 0;
	const bar = {
		variant: pBar.variant ?? "solid",
		radius: pBar.radius ?? 3,
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily sales">
				<ComposedChart
					data={REVENUE}
					stacked={p.stacked ?? false}
					barSize={barSize > 0 ? barSize : undefined}
					barGap={p.barGap ?? 4}
					status={p.status ?? "ready"}
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
