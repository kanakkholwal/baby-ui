/** Deterministic sample GitHub star history for the star-history block demos. */

export interface DemoStarDatum {
	date: Date;
	stars: number;
}

export interface DemoStarHistory {
	repo: string;
	createdAt: string;
	data: DemoStarDatum[];
}

const DAY_MS = 86_400_000;
const NOW = Date.UTC(2026, 9, 1, 12);

/** S-shaped growth: slow start, exponential middle, plateau toward the end. */
function buildSeries({
	start,
	seed,
	k,
	span,
	finalStars,
}: {
	start: number;
	seed: number;
	k: number;
	span: number;
	finalStars: number;
}) {
	const out: DemoStarDatum[] = [];
	let total = 0;
	for (let i = 0; i <= span; i += 1) {
		const t = i / span;
		const eased = 1 / (1 + Math.exp(-k * (t - 0.5)));
		const noise = 1 + 0.06 * Math.sin(i * 0.31 + seed);
		// A running max: a cumulative count only grows, the noise varies how fast.
		total = Math.max(total, Math.round(finalStars * eased * noise));
		out.push({ date: new Date(start + i * DAY_MS), stars: total });
	}
	return out;
}

function buildHistory(
	repo: string,
	createdAt: string,
	finalStars: number,
	span: number,
	seed: number,
): DemoStarHistory {
	const start = new Date(createdAt).getTime();
	return {
		repo,
		createdAt,
		data: buildSeries({ start, seed, k: 5.5, span, finalStars }),
	};
}

export const DEMO_STAR_HISTORIES = {
	mid: buildHistory("baby-ui/mid", "2024-12-01", 8_400, 290, 4),
	late: buildHistory("baby-ui/late", "2025-09-01", 412, 90, 4),
	viral: buildHistory("baby-ui/viral", "2024-04-15", 184_000, 410, 7),
};

export const DEMO_STAR_HISTORIES_LIST = [
	DEMO_STAR_HISTORIES.mid,
	DEMO_STAR_HISTORIES.late,
	DEMO_STAR_HISTORIES.viral,
];

void NOW;
