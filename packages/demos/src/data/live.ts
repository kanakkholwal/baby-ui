export const LIVE_TICK_MS = 500;
export const LIVE_CONFIG = { value: { label: "Price", color: "var(--chart-1)" } };

function mulberry32(seed: number) {
	let a = seed;
	return () => {
		a = (a + 0x6d2b79f5) | 0;
		let t = Math.imul(a ^ (a >>> 15), 1 | a);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

/** Seeded random walk the demos poll; the chart itself never generates data. */
export function createLiveFeed(seed = 7, start = 100) {
	const rand = mulberry32(seed);
	let value = start;
	let drift = 0;
	const step = () => {
		drift = drift * 0.9 + (rand() - 0.5) * 0.6;
		value = Math.max(1, value + drift + (rand() - 0.5) * 0.8);
		return Math.round(value * 100) / 100;
	};
	const backfill = (seconds: number) => {
		const now = Date.now() / 1000;
		const count = Math.floor((seconds * 1000) / LIVE_TICK_MS);
		return Array.from({ length: count }, (_, i) => ({
			time: now - ((count - i) * LIVE_TICK_MS) / 1000,
			value: step(),
		}));
	};
	return { step, backfill };
}

export function numberProp(value: unknown, fallback: number): number {
	const n = Number(value);
	return Number.isFinite(n) ? n : fallback;
}
