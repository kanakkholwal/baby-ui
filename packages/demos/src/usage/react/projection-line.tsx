"use client";

import { buildProjection, ProjectionLine } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";
import { Line, LineChart } from "@baby-ui/react/line-chart";

const data = [
	{ date: new Date("2026-06-01"), revenue: 4200 },
	{ date: new Date("2026-06-02"), revenue: 5100 },
	{ date: new Date("2026-06-03"), revenue: 4800 },
	{ date: new Date("2026-06-04"), revenue: 6200 },
];

const config = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;
const forecast = buildProjection({ data, dataKey: "revenue", horizon: 3 });

export function Example() {
	return (
		<ChartContainer config={config} title="Revenue forecast">
			<LineChart data={data}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line dataKey="revenue" />
				<ProjectionLine data={forecast} curve="bezier" />
				<ChartTooltip />
			</LineChart>
		</ChartContainer>
	);
}
