import { WORLD_VALUES } from "./world";

/** Deterministic sample for the stat cards: twelve months of revenue. */
export const MONTHLY_REVENUE = Array.from({ length: 12 }, (_, i) => ({
	date: new Date(Date.UTC(2025, i, 15)),
	revenue: Math.round(48_000 + 9_000 * Math.sin(i / 1.8) + i * 2_100),
}));

const values = MONTHLY_REVENUE.map((d) => d.revenue);
export const REVENUE_AVERAGE = Math.round(
	values.reduce((a, b) => a + b, 0) / values.length,
);
const first = values[0] ?? 1;
const last = values.at(-1) ?? first;
export const REVENUE_TREND = ((last - first) / first) * 100;

export const MAP_TOTAL = Math.round(
	Object.values(WORLD_VALUES).reduce((a, b) => a + b, 0),
);

/** A stable pseudo change per country so the badge moves as regions are explored. */
export const MAP_TRENDS: Record<string, number> = Object.fromEntries(
	Object.entries(WORLD_VALUES).map(([name, value]) => [name, ((value * 37) % 40) - 15]),
);
