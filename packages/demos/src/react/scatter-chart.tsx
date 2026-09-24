"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	Scatter,
	ScatterChart,
	type ScatterShape,
	type ScatterSize,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { READINGS, READINGS_CONFIG } from "../data/prices";

type Props = Record<string, unknown>;

const config = READINGS_CONFIG satisfies ChartConfig;

export function ScatterChartDemo({ props }: { props: Props }) {
	const size = (props.size as ScatterSize) ?? "md";
	const shape =
		props.shape && props.shape !== "auto" ? (props.shape as ScatterShape) : undefined;
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Sensor readings">
				<ScatterChart data={READINGS} status={(props.status as ChartStatus) ?? "ready"}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Scatter dataKey="north" size={size} shape={shape} />
					<Scatter dataKey="south" size={size} shape={shape} />
					<Scatter dataKey="east" size={size} shape={shape} />
					<ChartTooltip dots={false} />
				</ScatterChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
