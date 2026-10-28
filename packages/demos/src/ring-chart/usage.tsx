"use client";

import { RingChart } from "@baby-ui/react";
import { type ChartConfig, ChartContainer, ChartLegend } from "@baby-ui/react/chart";

const data = [
	{ name: "move", value: 420, max: 600 },
	{ name: "exercise", value: 38, max: 45 },
	{ name: "stand", value: 9, max: 12 },
];

const config = {
	move: { label: "Move", color: "var(--chart-1)" },
	exercise: { label: "Exercise", color: "var(--chart-2)" },
	stand: { label: "Stand", color: "var(--chart-3)" },
} satisfies ChartConfig;

export function Example() {
	return (
		<ChartContainer config={config} title="Daily goals" aspect="square">
			<RingChart data={data} cap="round" />
			<ChartLegend />
		</ChartContainer>
	);
}
