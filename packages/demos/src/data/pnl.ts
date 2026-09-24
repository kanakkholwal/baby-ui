const DAY = 86_400_000;
const START = Date.UTC(2026, 5, 1, 12);

/** Deterministic sample: 30 days of daily profit and loss crossing zero a few times. */
export const PNL = Array.from({ length: 30 }, (_, i) => ({
	date: new Date(START + i * DAY),
	pnl: Math.round(900 * Math.sin(i / 3.4) + 260 * Math.cos(i / 1.7) + i * 12),
}));

export const PNL_CONFIG = {
	pnl: { label: "Profit and loss", color: "var(--chart-positive)" },
};
