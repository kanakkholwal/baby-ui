/** Deterministic sample npm download data for the npm-stats block demos. */

export interface DemoPackage {
	name: string;
	allTime: number;
	last30Days: Array<{ date: string; downloads: number }>;
	last90Days: Array<{ date: string; downloads: number }>;
}

const DAY_MS = 86_400_000;
const TODAY = Date.UTC(2026, 9, 1, 12); // 2026-09-01

/** Daily count = floor(weekday × seasonal + noise). */
function dailyFromSeed(seed: number, days: number) {
	return Array.from({ length: days }, (_, i) => {
		const dow = new Date(TODAY - (days - 1 - i) * DAY_MS).getUTCDay();
		const weekend = dow === 0 || dow === 6 ? 0.6 : 1;
		const seasonal = 1 + 0.4 * Math.sin((i + seed) / 4.5);
		const noise = 0.85 + 0.3 * Math.sin((i + seed) / 1.7);
		const downloads = Math.round(weekend * seasonal * noise * (380 + seed * 220));
		const date = new Date(TODAY - (days - 1 - i) * DAY_MS);
		return {
			date: date.toISOString().slice(0, 10),
			downloads,
		};
	});
}

/** ISO weeks of the last 90 days (`'YYWww`) aggregated from daily counts. */
function weeklyFromDaily(daily: Array<{ date: string; downloads: number }>) {
	const buckets = new Map<string, number>();
	for (const row of daily) {
		const target = new Date(row.date);
		const dayNum = target.getUTCDay() || 7;
		target.setUTCDate(target.getUTCDate() + 4 - dayNum);
		const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
		const weekNo = Math.ceil(((target.getTime() - yearStart.getTime()) / DAY_MS + 1) / 7);
		const key = `'${String(target.getUTCFullYear()).slice(-2)}W${String(weekNo).padStart(2, "0")}`;
		buckets.set(key, (buckets.get(key) ?? 0) + row.downloads);
	}
	return Array.from(buckets.entries())
		.map(([date, downloads]) => ({ date, downloads }))
		.sort((a, b) => a.date.localeCompare(b.date));
}

function buildPackage(name: string, seed: number, allTime: number): DemoPackage {
	const daily = dailyFromSeed(seed, 95);
	const last30Days = daily.slice(-30);
	const last90Days = weeklyFromDaily(daily);
	return { name, allTime, last30Days, last90Days };
}

export const DEMO_NPM_PACKAGES: DemoPackage[] = [
	buildPackage("@baby-ui/react", 7, 2_410_823),
	buildPackage("@baby-ui/svelte", 5, 1_322_511),
	buildPackage("@baby-ui/icons", 3, 488_201),
	buildPackage("@baby-ui/tokens", 2, 217_334),
];

export const DEMO_NPM_PACKAGE_SOLO = buildPackage("@baby-ui/react", 7, 2_410_823);
