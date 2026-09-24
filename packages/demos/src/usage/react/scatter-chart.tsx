"use client";

import { Scatter, ScatterChart } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";

const data = [
	{ date: new Date("2026-04-01"), north: 42, south: 61 },
	{ date: new Date("2026-04-02"), north: 48, south: 55 },
	{ date: new Date("2026-04-03"), north: 39, south: 66 },
	{ date: new Date("2026-04-04"), north: 51, south: 58 },
];

const config = {
	north: { label: "North", color: "var(--chart-1)" },
	south: { label: "South", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function Example() {
	return (
		<ChartContainer config={config} title="Sensor readings">
			<ScatterChart data={data}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Scatter dataKey="north" />
				<Scatter dataKey="south" size="lg" />
				<ChartTooltip dots={false} />
			</ScatterChart>
			<ChartLegend />
		</ChartContainer>
	);
}
