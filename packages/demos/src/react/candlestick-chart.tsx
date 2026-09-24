"use client";

import {
	Candlestick,
	CandlestickChart,
	type CandlestickSize,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { PRICES, PRICES_CONFIG } from "../data/prices";

type Props = Record<string, unknown>;

const config = PRICES_CONFIG satisfies ChartConfig;

export function CandlestickChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Share price">
				<CandlestickChart data={PRICES} status={(props.status as ChartStatus) ?? "ready"}>
					<CartesianGrid />
					<YAxis tickFormatter={(v) => `$${v}`} />
					<XAxis />
					<Candlestick
						size={(props.size as CandlestickSize) ?? "regular"}
						dimOpacity={Number(props.dimOpacity ?? 0.4)}
					/>
					<ChartTooltip dots={false} content={<ChartTooltipContent indicator="line" />} />
				</CandlestickChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
