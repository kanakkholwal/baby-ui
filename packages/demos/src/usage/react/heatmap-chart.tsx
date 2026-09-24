"use client";

import { HeatmapChart, HeatmapLegend } from "@baby-ui/react";
import { ChartContainer } from "@baby-ui/react/chart";
import { useState } from "react";

const data = [
	{ date: "2026-03-02", value: 4 },
	{ date: "2026-03-03", value: 9 },
	{ date: "2026-03-05", value: 2 },
	{ date: "2026-03-09", value: 6 },
];

export function Example() {
	const [day, setDay] = useState<number | null>(null);
	return (
		<ChartContainer config={{}} title="Commits" aspect="auto" className="h-48">
			<HeatmapChart
				data={data}
				activeIndex={day}
				onActiveIndexChange={setDay}
				formatLabel={(value) => `${value} commits`}
			/>
			<HeatmapLegend />
		</ChartContainer>
	);
}
