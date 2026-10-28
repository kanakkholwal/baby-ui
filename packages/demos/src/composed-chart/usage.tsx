"use client";

import { ComposedChart, SeriesBar } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";
import { Line } from "@baby-ui/react/line-chart";

const data = [
	{ date: new Date("2026-05-01"), online: 420, store: 300, target: 760 },
	{ date: new Date("2026-05-02"), online: 510, store: 280, target: 780 },
	{ date: new Date("2026-05-03"), online: 470, store: 350, target: 800 },
	{ date: new Date("2026-05-04"), online: 560, store: 330, target: 820 },
];

const config = {
	online: { label: "Online", color: "var(--chart-1)" },
	store: { label: "Store", color: "var(--chart-2)" },
	target: { label: "Target", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function Example() {
	return (
		<ChartContainer config={config} title="Daily sales">
			<ComposedChart data={data} stacked>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<SeriesBar dataKey="online" />
				<SeriesBar dataKey="store" />
				<Line dataKey="target" variant="dashed" />
				<ChartTooltip />
			</ComposedChart>
			<ChartLegend />
		</ChartContainer>
	);
}
