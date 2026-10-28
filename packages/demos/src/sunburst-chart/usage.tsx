"use client";

import { SunburstChart } from "@baby-ui/react";
import { type ChartConfig, ChartContainer } from "@baby-ui/react/chart";
import { useState } from "react";

const data = {
	name: "Revenue",
	children: [
		{
			name: "americas",
			children: [
				{ name: "United States", value: 7700 },
				{ name: "Canada", value: 1550 },
			],
		},
		{
			name: "europe",
			children: [
				{ name: "Germany", value: 3100 },
				{ name: "France", value: 1300 },
			],
		},
	],
};

const config = {
	americas: { label: "Americas", color: "var(--chart-1)" },
	europe: { label: "Europe", color: "var(--chart-2)" },
} satisfies ChartConfig;

export function Example() {
	const [focus, setFocus] = useState("Revenue");
	return (
		<ChartContainer config={config} title="Revenue by region" aspect="square">
			<SunburstChart data={data} focus={focus} onFocusChange={setFocus} />
		</ChartContainer>
	);
}
