const DAY = 86_400_000;
const START = Date.UTC(2026, 4, 1, 12);

/** Deterministic sample for the composed chart: 14 days of online and store sales against a target. */
export const REVENUE = Array.from({ length: 14 }, (_, i) => ({
	date: new Date(START + i * DAY),
	online: Math.round(420 + 160 * Math.sin(i / 2.1) + i * 14),
	store: Math.round(300 + 110 * Math.cos(i / 1.7) + i * 6),
	target: Math.round(760 + i * 18),
}));

export const REVENUE_CONFIG = {
	online: { label: "Online", color: "var(--chart-1)" },
	store: { label: "Store", color: "var(--chart-2)" },
	target: { label: "Target", color: "var(--chart-3)" },
};
