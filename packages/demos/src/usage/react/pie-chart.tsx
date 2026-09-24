"use client";

import { PieChart } from "@baby-ui/react";
import { type ChartConfig, ChartContainer, ChartLegend } from "@baby-ui/react/chart";
import { useState } from "react";

const data = [
	{ name: "direct", value: 4280 },
	{ name: "search", value: 3150 },
	{ name: "social", value: 1890 },
];

const config = {
	direct: { label: "Direct", color: "var(--chart-1)" },
	search: { label: "Search", color: "var(--chart-2)" },
	social: { label: "Social", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function Example() {
	const [active, setActive] = useState<number | null>(null);
	return (
		<ChartContainer config={config} title="Traffic by channel" aspect="square">
			<PieChart data={data} activeIndex={active} onActiveIndexChange={setActive} />
			<ChartLegend />
		</ChartContainer>
	);
}
