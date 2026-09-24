"use client";

import {
	Bar,
	BarChart,
	type BarEntrance,
	type BarLineCap,
	type BarOrientationVariant,
	BarTooltip,
	type BarVariant,
	BarXAxis,
	BarYAxis,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
} from "@baby-ui/react";
import { MONTHLY, MONTHLY_CONFIG } from "../data/monthly";

type Props = Record<string, unknown>;

const config = MONTHLY_CONFIG satisfies ChartConfig;

export function BarChartDemo({ props }: { props: Props }) {
	const orientation = (props.orientation as BarOrientationVariant) ?? "vertical";
	const bar = {
		lineCap: (props.lineCap as BarLineCap) ?? "round",
		texture: props.texture === true,
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Monthly revenue and profit">
				<BarChart
					data={MONTHLY}
					orientation={orientation}
					variant={(props.variant as BarVariant) ?? "bar"}
					entrance={(props.entrance as BarEntrance) ?? "grow"}
					stacked={props.stacked === true}
					status={(props.status as ChartStatus) ?? "ready"}
					margin={orientation === "horizontal" ? { left: 48, bottom: 28 } : undefined}
				>
					<CartesianGrid />
					<BarTooltip />
					<Bar dataKey="revenue" {...bar} />
					<Bar dataKey="profit" {...bar} />
					<BarXAxis />
					<BarYAxis />
				</BarChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
