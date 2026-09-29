"use client";

import {
	Bar,
	BarChart,
	BarTooltip,
	BarXAxis,
	BarYAxis,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { MONTHLY, MONTHLY_CONFIG } from "../data/monthly";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const config = MONTHLY_CONFIG satisfies ChartConfig;

export function BarChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof BarChart>>(props);
	const pBar = controlProps<ComponentProps<typeof Bar>>(props);
	const orientation = p.orientation ?? "vertical";
	const bar = {
		lineCap: pBar.lineCap ?? "round",
		texture: pBar.texture ?? false,
	};
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Monthly revenue and profit">
				<BarChart
					data={MONTHLY}
					orientation={orientation}
					variant={p.variant ?? "bar"}
					entrance={p.entrance ?? "grow"}
					stacked={p.stacked ?? false}
					status={p.status ?? "ready"}
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
