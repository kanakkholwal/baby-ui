"use client";

import {
	CartesianGrid,
	type ChartAspect,
	type ChartConfig,
	ChartContainer,
	type ChartGridVariant,
	ChartLegend,
	type ChartLegendAlign,
	ChartLegendContent,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	type ChartTooltipIndicator,
	Line,
	LineChart,
	type LineCurve,
	type LineVariant,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { fadeProp, localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;

export function ChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer
				config={config}
				title="Daily visitors"
				aspect={(props.aspect as ChartAspect) ?? "video"}
				locale={localeProp(props.locale)}
			>
				<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
					<CartesianGrid variant={(props.variant as ChartGridVariant) ?? "dashed"} />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" />
					<Line dataKey="mobile" />
					<ChartTooltip
						datePill={props.datePill !== false}
						content={
							<ChartTooltipContent
								indicator={(props.indicator as ChartTooltipIndicator) ?? "dot"}
							/>
						}
					/>
				</LineChart>
				<ChartLegend
					content={
						<ChartLegendContent align={(props.align as ChartLegendAlign) ?? "center"} />
					}
				/>
			</ChartContainer>
		</div>
	);
}

export function LineChartDemo({ props }: { props: Props }) {
	const line = {
		curve: (props.curve as LineCurve) ?? "natural",
		variant: (props.variant as LineVariant) ?? "solid",
		strokeWidth: Number(props.strokeWidth ?? 2.5),
		fadeEdges: fadeProp(props.fadeEdges),
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" {...line} />
					<Line dataKey="mobile" {...line} />
					<ChartTooltip />
				</LineChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
