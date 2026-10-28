"use client";

import { SankeyChart } from "@baby-ui/react";
import { ChartContainer } from "@baby-ui/react/chart";

const data = {
	nodes: [
		{ name: "Search" },
		{ name: "Social" },
		{ name: "Pricing" },
		{ name: "Signup" },
	],
	links: [
		{ source: 0, target: 2, value: 1840 },
		{ source: 1, target: 2, value: 760 },
		{ source: 2, target: 3, value: 1310 },
	],
};

export function Example() {
	return (
		<ChartContainer config={{}} title="Visitor journeys" aspect="wide">
			<SankeyChart data={data} linkColor="source" />
		</ChartContainer>
	);
}
