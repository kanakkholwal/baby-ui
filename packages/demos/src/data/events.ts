const DAY = 86_400_000;
const START = Date.UTC(2026, 5, 1, 12);
const on = (day: number) => new Date(START + day * DAY);

/** Sample release notes aligned to the VISITORS series for marker demos. */
export const EVENTS = [
	{ date: on(4), title: "Launch week", description: "Public beta opened" },
	{ date: on(11), title: "Pricing update", description: "New team plan" },
	{ date: on(11), title: "Docs refresh", description: "Rewritten guides" },
	{ date: on(19), title: "Mobile app", description: "iOS release" },
	{ date: on(19), title: "Outage", description: "38 minutes, API region" },
	{ date: on(19), title: "Hotfix", description: "Sync patch shipped" },
	{ date: on(25), title: "Conference talk", description: "Keynote demo" },
];
