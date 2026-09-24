"use client";

import { OverviewCard } from "@baby-ui/react";
import { useState } from "react";

const data = [
	{ date: new Date("2026-01-15"), revenue: 2100 },
	{ date: new Date("2026-01-16"), revenue: 2340 },
	{ date: new Date("2026-01-17"), revenue: 2050 },
	{ date: new Date("2026-01-18"), revenue: 2510 },
];

const periods = [
	{ value: "7d", label: "7D" },
	{ value: "30d", label: "30D" },
];

const usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 0,
}).format;

export function Example() {
	const [period, setPeriod] = useState("7d");

	return (
		<OverviewCard
			title="Total revenue"
			data={data}
			dataKey="revenue"
			value={9000}
			label="7D"
			trend={19.5}
			periods={periods}
			period={period}
			onPeriodChange={setPeriod}
			formatValue={usd}
		/>
	);
}
