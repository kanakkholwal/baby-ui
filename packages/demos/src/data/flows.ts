/** Deterministic sample flows for sankey demos: traffic source to page to outcome. */
export const TRAFFIC_FLOWS = {
	nodes: [
		{ name: "Search" },
		{ name: "Social" },
		{ name: "Referral" },
		{ name: "Pricing" },
		{ name: "Docs" },
		{ name: "Signup" },
		{ name: "Bounce" },
	],
	links: [
		{ source: 0, target: 3, value: 1840 },
		{ source: 0, target: 4, value: 1220 },
		{ source: 1, target: 3, value: 760 },
		{ source: 1, target: 4, value: 410 },
		{ source: 2, target: 3, value: 520 },
		{ source: 2, target: 4, value: 290 },
		{ source: 3, target: 5, value: 1310 },
		{ source: 3, target: 6, value: 1810 },
		{ source: 4, target: 5, value: 680 },
		{ source: 4, target: 6, value: 1240 },
	],
};

const DAY = 86_400_000;
const START = Date.UTC(2026, 0, 5, 12);

/** 26 weeks of daily counts from a fixed sine mix, heavier on weekdays. */
export const DAILY_ACTIVITY = Array.from({ length: 182 }, (_, i) => {
	const date = new Date(START + i * DAY);
	const weekday = date.getUTCDay();
	const wave = Math.sin(i / 9) * 0.5 + Math.sin(i / 3.1) * 0.35 + 0.5;
	const weekend = weekday === 0 || weekday === 6 ? 0.35 : 1;
	const value = Math.max(0, Math.round(wave * weekend * 9 - (i % 11 === 0 ? 4 : 0)));
	return { date, value };
});
