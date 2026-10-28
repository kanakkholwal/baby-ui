"use client";

import { ChartBrush } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";
import { Line, LineChart } from "@baby-ui/react/line-chart";
import { useState } from "react";

const data = Array.from({ length: 60 }, (_, i) => ({
	date: new Date(Date.UTC(2026, 0, 1 + i)),
	orders: 120 + Math.round(40 * Math.sin(i / 5)),
}));

const config = {
	orders: { label: "Orders", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function Example() {
	const [range, setRange] = useState<[Date, Date] | undefined>();
	return (
		<ChartContainer config={config} title="Orders" aspect="auto" className="h-96">
			<LineChart data={data} xDomain={range}>
				<CartesianGrid />
				<YAxis />
				<XAxis />
				<Line dataKey="orders" />
			</LineChart>
			<ChartBrush
				data={data}
				dataKeys={["orders"]}
				range={range}
				onRangeChange={setRange}
			/>
		</ChartContainer>
	);
}
