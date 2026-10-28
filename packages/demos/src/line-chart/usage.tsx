"use client";

import { Line, LineChart } from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	XAxis,
	YAxis,
} from "@baby-ui/react/chart";
import { useState } from "react";

const data = [
	{ date: new Date("2026-06-01"), revenue: 4200 },
	{ date: new Date("2026-06-02"), revenue: 5100 },
	{ date: new Date("2026-06-03"), revenue: 4800 },
	{ date: new Date("2026-06-04"), revenue: 6200 },
];

const config = {
	revenue: { label: "Revenue", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function Example() {
	const [active, setActive] = useState<number | null>(null);
	return (
		<ChartContainer config={config} title="Revenue">
			<LineChart data={data} activeIndex={active} onActiveIndexChange={setActive}>
				<CartesianGrid />
				<YAxis tickFormatter={(v) => `$${v / 1000}k`} />
				<XAxis />
				<Line dataKey="revenue" curve="monotone" />
				<ChartTooltip />
			</LineChart>
		</ChartContainer>
	);
}
