"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { Line, LineChart } from "@baby-ui/react/line-chart";

const data = [
	{ date: new Date("2026-06-01"), desktop: 1840, mobile: 1320 },
	{ date: new Date("2026-06-02"), desktop: 2150, mobile: 1180 },
	{ date: new Date("2026-06-03"), desktop: 1990, mobile: 1460 },
	{ date: new Date("2026-06-04"), desktop: 2380, mobile: 1510 },
];

const config = {
	desktop: { label: "Desktop", color: "var(--chart-1)" },
	mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function Example() {
	return (
		<ChartContainer config={config} title="Daily visitors">
			<LineChart data={data}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line dataKey="desktop" />
				<Line dataKey="mobile" />
				<ChartTooltip content={<ChartTooltipContent indicator="line" />} />
			</LineChart>
			<ChartLegend />
		</ChartContainer>
	);
}
