"use client";

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

export function Example({ loading }: { loading: boolean }) {
	return (
		<ChartContainer config={config} title="Revenue">
			<LineChart data={data} status={loading ? "loading" : "ready"}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line
					dataKey="revenue"
					showMarkers
					terminalMarker
					dashFromIndex={2}
					loadingStyle="sweep"
				/>
				<ChartTooltip />
			</LineChart>
		</ChartContainer>
	);
}
