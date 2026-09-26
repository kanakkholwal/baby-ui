const LAST = new Date(2026, 8, 25);

function rng(seed: number) {
	let state = seed;
	return () => {
		state = (state * 16_807) % 2_147_483_647;
		return (state - 1) / 2_147_483_646;
	};
}

/** A year of seeded activity: quieter weekends, a mid-year streak, a few idle weeks. */
export const CONTRIBUTIONS = (() => {
	const next = rng(20_260_925);
	return Array.from({ length: 365 }, (_, i) => {
		const date = new Date(LAST);
		date.setDate(date.getDate() - (364 - i));
		const weekend = date.getDay() === 0 || date.getDay() === 6;
		const idle = (i > 60 && i < 74) || (i > 280 && i < 288);
		const streak = i > 150 && i < 200 ? 4 : 0;
		const roll = next();
		const count =
			idle || roll < (weekend ? 0.55 : 0.2) ? 0 : Math.round(roll * 9 + streak);
		const m = String(date.getMonth() + 1).padStart(2, "0");
		const d = String(date.getDate()).padStart(2, "0");
		return { date: `${date.getFullYear()}-${m}-${d}`, count };
	});
})();
