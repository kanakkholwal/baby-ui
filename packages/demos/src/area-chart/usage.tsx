"use client";

import { Area, AreaChart } from "@baby-ui/react";
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
			<AreaChart data={data} stacked>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Area dataKey="mobile" />
				<Area dataKey="desktop" variant="pattern" />
				<ChartTooltip />
			</AreaChart>
			<ChartLegend />
		</ChartContainer>
	);
}
