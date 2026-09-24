"use client";

import {
	type ChoroplethProjection,
	StatCard,
	type StatCardChartKind,
	StatCardMap,
	type StatCardMapSize,
	type StatCardSize,
} from "@baby-ui/react";
import {
	MAP_TOTAL,
	MAP_TRENDS,
	MONTHLY_REVENUE,
	REVENUE_AVERAGE,
	REVENUE_TREND,
} from "../data/stat";
import { WORLD, WORLD_VALUES } from "../data/world";

type Props = Record<string, unknown>;

const currency = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
}).format;

export function StatCardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-sm">
			<StatCard
				title="Total revenue"
				data={MONTHLY_REVENUE}
				dataKey="revenue"
				value={REVENUE_AVERAGE}
				label="Monthly average"
				trend={REVENUE_TREND}
				chart={(props.chart as StatCardChartKind) ?? "area"}
				size={(props.size as StatCardSize) ?? "md"}
				formatValue={currency}
			/>
		</div>
	);
}

export function StatCardMapDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-2xl">
			<StatCardMap
				title="Sample index"
				geo={WORLD}
				values={WORLD_VALUES}
				trends={MAP_TRENDS}
				value={MAP_TOTAL}
				label="All countries"
				trend={8.4}
				projection={(props.projection as ChoroplethProjection) ?? "equalEarth"}
				size={(props.size as StatCardMapSize) ?? "md"}
			/>
		</div>
	);
}
