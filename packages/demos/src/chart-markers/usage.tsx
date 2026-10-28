"use client";

import { type ChartMarker, ChartMarkers, ChartMarkerTooltip } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";
import { Line, LineChart } from "@baby-ui/react/line-chart";

const data = [
	{ date: new Date("2026-06-01"), visits: 1840 },
	{ date: new Date("2026-06-02"), visits: 2150 },
	{ date: new Date("2026-06-03"), visits: 1990 },
	{ date: new Date("2026-06-04"), visits: 2380 },
];

const config = {
	visits: { label: "Visits", color: "var(--chart-1)" },
} satisfies ChartConfig;

const markers: ChartMarker[] = [
	{ date: new Date("2026-06-02"), title: "Launch", href: "/changelog" },
	{ date: new Date("2026-06-04"), title: "Pricing update" },
	{ date: new Date("2026-06-04"), title: "Docs refresh" },
];

export function Example() {
	return (
		<ChartContainer config={config} title="Visits">
			<LineChart data={data} margin={{ top: 32 }}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line dataKey="visits" />
				<ChartMarkers items={markers} />
				<ChartTooltip
					content={
						<>
							<ChartTooltipContent />
							<ChartMarkerTooltip items={markers} />
						</>
					}
				/>
			</LineChart>
		</ChartContainer>
	);
}
