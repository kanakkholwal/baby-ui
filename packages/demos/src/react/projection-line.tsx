"use client";

import {
	buildProjection,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	ProjectionLine,
	type ProjectionLineCurve,
	type ProjectionLineVariant,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;

export function ProjectionLineDemo({ props }: { props: Props }) {
	const projection = buildProjection({
		data: VISITORS,
		dataKey: "desktop",
		horizon: Number(props.horizon ?? 7),
	});
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Desktop visitors with forecast">
				<LineChart data={VISITORS}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" fadeEdges="left" />
					<ProjectionLine
						data={projection}
						variant={(props.variant as ProjectionLineVariant) ?? "dashed"}
						curve={(props.curve as ProjectionLineCurve) ?? "linear"}
						endMarker={props.endMarker !== false}
					/>
					<ChartTooltip />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
