/** Deterministic daily revenue, one series per period so the switcher swaps real data. */
function daily(days: number, base: number) {
	return Array.from({ length: days }, (_, i) => ({
		date: new Date(Date.UTC(2025, 11, 31 - (days - 1 - i))),
		revenue: Math.round(base + base * 0.35 * Math.sin(i / 3.2) + i * (base / (days * 6))),
	}));
}

function summarize(rows: { revenue: number }[]) {
	const values = rows.map((r) => r.revenue);
	const total = values.reduce((a, b) => a + b, 0);
	const first = values[0] ?? 1;
	const last = values.at(-1) ?? first;
	return { total, trend: ((last - first) / first) * 100 };
}

export const REVENUE_7D = daily(7, 2_400);
export const REVENUE_30D = daily(30, 2_100);
export const REVENUE_90D = daily(90, 1_950);

export const REVENUE_BY_PERIOD = {
	"7d": { data: REVENUE_7D, ...summarize(REVENUE_7D) },
	"30d": { data: REVENUE_30D, ...summarize(REVENUE_30D) },
	"90d": { data: REVENUE_90D, ...summarize(REVENUE_90D) },
};

export const REVENUE_PERIODS = [
	{ value: "7d", label: "7D" },
	{ value: "30d", label: "30D" },
	{ value: "90d", label: "90D" },
];
