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
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;

export function ProjectionLineDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ProjectionLine>>(props);
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
						variant={p.variant ?? "dashed"}
						curve={p.curve ?? "linear"}
						endMarker={p.endMarker !== false}
					/>
					<ChartTooltip />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
