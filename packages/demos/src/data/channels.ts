/** Sample share of traffic by channel for pie demos; names match the config keys. */
export const CHANNELS = [
	{ name: "direct", value: 4280 },
	{ name: "search", value: 3150 },
	{ name: "social", value: 1890 },
	{ name: "email", value: 1240 },
	{ name: "referral", value: 760 },
];

export const CHANNELS_CONFIG = {
	direct: { label: "Direct", color: "var(--chart-1)" },
	search: { label: "Search", color: "var(--chart-2)" },
	social: { label: "Social", color: "var(--chart-3)" },
	email: { label: "Email", color: "var(--chart-4)" },
	referral: { label: "Referral", color: "var(--chart-5)" },
};

/** Sample goal progress for ring demos. */
export const GOALS = [
	{ name: "move", value: 420, max: 600 },
	{ name: "exercise", value: 38, max: 45 },
	{ name: "stand", value: 9, max: 12 },
];

export const GOALS_CONFIG = {
	move: { label: "Move", color: "var(--chart-1)" },
	exercise: { label: "Exercise", color: "var(--chart-2)" },
	stand: { label: "Stand", color: "var(--chart-3)" },
};
