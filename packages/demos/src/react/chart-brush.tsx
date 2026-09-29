"use client";

import {
	CartesianGrid,
	ChartBrush,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;
const first = VISITORS[7]?.date ?? new Date();
const last = VISITORS[21]?.date ?? new Date();

export function ChartBrushDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ChartBrush>>(props);
	const [range, setRange] = useState<[Date, Date]>([first, last]);
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer
				config={config}
				title="Daily visitors"
				aspect="auto"
				className="h-96"
			>
				<LineChart data={VISITORS} xDomain={range}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" />
					<Line dataKey="mobile" />
					<ChartTooltip />
				</LineChart>
				<ChartBrush
					data={VISITORS}
					dataKeys={["desktop", "mobile"]}
					range={range}
					onRangeChange={setRange}
					variant={p.variant ?? "area"}
					height={p.height ?? 64}
				/>
			</ChartContainer>
		</div>
	);
}
