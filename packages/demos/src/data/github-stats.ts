/** Deterministic sample GitHub profile for the github-stats block demos. */

export interface DemoContributionDay {
	date: string;
	count: number;
}

const DAY_MS = 86_400_000;

function iso(time: number): string {
	return new Date(time).toISOString().slice(0, 10);
}

/** Weekdays busier than weekends, a slow sine of busy and quiet stretches, some empty days. */
function buildYear(year: number, until: number, seed: number): DemoContributionDay[] {
	const days: DemoContributionDay[] = [];
	const start = Date.UTC(year, 0, 1);
	const end = Math.min(Date.UTC(year, 11, 31), until);
	for (let time = start, i = 0; time <= end; time += DAY_MS, i += 1) {
		const weekday = new Date(time).getUTCDay();
		const weekend = weekday === 0 || weekday === 6;
		const wave = 0.5 + 0.5 * Math.sin(i / 19 + seed);
		const noise = Math.abs(Math.sin(i * 12.9898 + seed * 78.233)) % 1;
		const busy = (weekend ? 0.35 : 1) * (0.25 + wave);
		const count = noise < 0.18 ? 0 : Math.round(busy * noise * 14);
		days.push({ date: iso(time), count });
	}
	return days;
}

const TODAY = Date.UTC(2026, 9, 1);

export const DEMO_GITHUB_STATS = {
	counts: { followers: 1284, stars: 18_420, repos: 96, forks: 2130 },
	contributions: {
		"2026": buildYear(2026, TODAY, 3),
		"2025": buildYear(2025, TODAY, 7),
		"2024": buildYear(2024, TODAY, 11),
	},
	mix: { commits: 64, pullRequests: 21, codeReviews: 9, issues: 6 },
	organizations: [
		{ name: "Baby UI", url: "https://github.com/" },
		{ name: "Open Atlas", url: "https://github.com/#open-atlas" },
		{ name: "Night Shift", url: "https://github.com/#night-shift" },
	],
	repositories: [
		{ owner: "baby-ui", name: "registry", url: "https://github.com/#registry" },
		{ owner: "open-atlas", name: "tiles", url: "https://github.com/#tiles" },
		{ owner: "night-shift", name: "cli", url: "https://github.com/#cli" },
		{ owner: "baby-ui", name: "icons", url: "https://github.com/#icons" },
		{ owner: "open-atlas", name: "geo", url: "https://github.com/#geo" },
		{ owner: "night-shift", name: "queue", url: "https://github.com/#queue" },
	],
	profileUrl: "https://github.com/",
};
