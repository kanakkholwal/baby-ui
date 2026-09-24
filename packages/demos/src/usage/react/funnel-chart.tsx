"use client";

import { FunnelChart } from "@baby-ui/react";
import { ChartContainer } from "@baby-ui/react/chart";

const data = [
	{ label: "Visitors", value: 12400 },
	{ label: "Signed up", value: 5310 },
	{ label: "Activated", value: 2860 },
	{ label: "Subscribed", value: 940 },
];

export function Example() {
	return (
		<ChartContainer config={{}} title="Signup funnel" aspect="wide">
			<FunnelChart data={data} edges="straight" />
		</ChartContainer>
	);
}
