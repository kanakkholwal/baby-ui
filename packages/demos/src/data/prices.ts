const DAY = 86_400_000;
const START = Date.UTC(2026, 3, 1, 12);

/** Deterministic daily OHLC for the candlestick demo: a drift with a mid-run pullback. */
export const PRICES = Array.from({ length: 36 }, (_, i) => {
	const base =
		182 + i * 0.9 + 9 * Math.sin(i / 3.1) - (i > 18 && i < 26 ? (i - 18) * 1.6 : 0);
	const open = base + 2.2 * Math.sin(i * 1.7);
	const close = base + 2.6 * Math.cos(i * 1.3);
	const high = Math.max(open, close) + 1.4 + Math.abs(Math.sin(i * 2.3)) * 2.4;
	const low = Math.min(open, close) - 1.3 - Math.abs(Math.cos(i * 1.9)) * 2.2;
	const round = (v: number) => Math.round(v * 100) / 100;
	return {
		date: new Date(START + i * DAY),
		open: round(open),
		high: round(high),
		low: round(low),
		close: round(close),
	};
});

export const PRICES_CONFIG = {
	up: { label: "Rising", color: "var(--chart-positive)" },
	down: { label: "Falling", color: "var(--chart-negative)" },
};

/** Deterministic readings for the scatter demo: three sensors over 40 days. */
export const READINGS = Array.from({ length: 40 }, (_, i) => ({
	date: new Date(START + i * DAY),
	north: Math.round(42 + 14 * Math.sin(i / 4.3) + 6 * Math.sin(i * 2.9)),
	south: Math.round(58 + 11 * Math.cos(i / 5.1) + 7 * Math.cos(i * 2.1)),
	east: Math.round(30 + i * 0.6 + 8 * Math.sin(i * 1.7)),
}));

export const READINGS_CONFIG = {
	north: { label: "North", color: "var(--chart-1)" },
	south: { label: "South", color: "var(--chart-2)" },
	east: { label: "East", color: "var(--chart-3)" },
};
