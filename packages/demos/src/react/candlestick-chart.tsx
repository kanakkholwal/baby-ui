"use client";

import {
	Candlestick,
	CandlestickChart,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	ChartTooltipContent,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { PRICES, PRICES_CONFIG } from "../data/prices";

type Props = Record<string, unknown>;

const config = PRICES_CONFIG satisfies ChartConfig;

export function CandlestickChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof CandlestickChart>>(props);
	const pCandle = controlProps<ComponentProps<typeof Candlestick>>(props);
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Share price">
				<CandlestickChart data={PRICES} status={p.status ?? "ready"}>
					<CartesianGrid />
					<YAxis tickFormatter={(v) => `$${v}`} />
					<XAxis />
					<Candlestick
						size={pCandle.size ?? "regular"}
						dimOpacity={pCandle.dimOpacity ?? 0.4}
					/>
					<ChartTooltip dots={false} content={<ChartTooltipContent indicator="line" />} />
				</CandlestickChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
