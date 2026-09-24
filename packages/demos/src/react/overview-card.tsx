"use client";

import {
	OverviewCard,
	type OverviewCardChart,
	type OverviewCardSize,
} from "@baby-ui/react";
import { useState } from "react";
import { REVENUE_BY_PERIOD, REVENUE_PERIODS } from "../data/overview";

type Props = Record<string, unknown>;

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
}).format;

export function OverviewCardDemo({ props }: { props: Props }) {
	const [period, setPeriod] = useState("30d");
	const reading = REVENUE_BY_PERIOD[period as keyof typeof REVENUE_BY_PERIOD];

	return (
		<div className="w-full max-w-lg">
			<OverviewCard
				title="Total revenue"
				data={reading.data}
				dataKey="revenue"
				value={reading.total}
				label={REVENUE_PERIODS.find((p) => p.value === period)?.label ?? ""}
				trend={reading.trend}
				periods={REVENUE_PERIODS}
				period={period}
				onPeriodChange={setPeriod}
				chart={(props.chart as OverviewCardChart) ?? "area"}
				size={(props.size as OverviewCardSize) ?? "md"}
				formatValue={currency}
			/>
		</div>
	);
}
