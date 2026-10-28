"use client";

import {
	RadarArea,
	RadarAxis,
	RadarChart,
	RadarGrid,
	RadarLabels,
	RadarTooltip,
} from "@baby-ui/react";
import { ChartContainer } from "@baby-ui/react/chart";

const metrics = [
	{ key: "speed", label: "Speed" },
	{ key: "power", label: "Power" },
	{ key: "range", label: "Range" },
	{ key: "battery", label: "Battery" },
	{ key: "price", label: "Value" },
];

const data = [
	{
		label: "Model A",
		values: { speed: 82, power: 70, range: 64, battery: 90, price: 58 },
	},
	{
		label: "Model B",
		values: { speed: 66, power: 88, range: 80, battery: 62, price: 74 },
	},
];

export function Example() {
	return (
		<ChartContainer config={{}} title="Model comparison" aspect="square">
			<RadarChart data={data} metrics={metrics} grid="circle">
				<RadarGrid />
				<RadarAxis />
				<RadarLabels />
				{data.map((s, i) => (
					<RadarArea key={s.label} index={i} />
				))}
				<RadarTooltip />
			</RadarChart>
		</ChartContainer>
	);
}
