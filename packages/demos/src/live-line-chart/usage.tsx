"use client";

import {
	LiveLine,
	LiveLineChart,
	type LivePoint,
	LiveXAxis,
	LiveYAxis,
} from "@baby-ui/react";
import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
} from "@baby-ui/react/chart";
import { useEffect, useState } from "react";

const config = {
	value: { label: "Requests/s", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function Example({
	subscribe,
}: {
	subscribe: (push: (value: number) => void) => () => void;
}) {
	const [data, setData] = useState<LivePoint[]>([]);
	useEffect(
		() =>
			subscribe((value) =>
				setData((prev) => [...prev.slice(-240), { time: Date.now() / 1000, value }]),
			),
		[subscribe],
	);
	return (
		<ChartContainer config={config} title="Requests per second">
			<LiveLineChart data={data} value={data.at(-1)?.value ?? 0} window={30}>
				<CartesianGrid />
				<LiveYAxis />
				<LiveXAxis />
				<LiveLine dataKey="value" />
				<ChartTooltip datePill={false} dots={false} />
			</LiveLineChart>
		</ChartContainer>
	);
}
