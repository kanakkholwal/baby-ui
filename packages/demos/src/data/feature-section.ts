import { PRODUCT_SHOTS } from "./media";

/** Stroke paths on a 24px grid, drawn as inline `<svg>` by the demos. */
const ICON = {
	bolt: "M13 3 5 14h6l-1 7 8-11h-6l1-7Z",
	shield: "M12 3 5 6v5c0 4.5 3 8.3 7 10 4-1.7 7-5.5 7-10V6l-7-3Z",
	sliders: "M4 7h10m4 0h2M4 17h4m4 0h8M16 5v4M10 15v4",
	sparkle: "M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18m0-12-2.5 2.5m-7 7L6 18",
	globe:
		"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z",
	layers: "m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5",
};

export const FEATURE_SECTION = {
	eyebrow: "Platform",
	title: "Everything a fast team needs",
	description:
		"Plan, ship and measure in one place, with the guard rails that keep a growing team from stepping on each other.",
	features: [
		{
			title: "Instant sync",
			description: "Edits land for everyone in under a second, even on a train.",
			icon: ICON.bolt,
		},
		{
			title: "Granular access",
			description:
				"Roles per project and per field, with an audit trail for each change.",
			icon: ICON.shield,
		},
		{
			title: "Your workflow",
			description:
				"Custom states, fields and views that match how the team already works.",
			icon: ICON.sliders,
		},
		{
			title: "Smart triage",
			description: "New requests sort themselves by owner, urgency and duplicate.",
			icon: ICON.sparkle,
		},
		{
			title: "Global by default",
			description:
				"Data stays in the region you choose, served from the edge nearest you.",
			icon: ICON.globe,
		},
		{
			title: "Works with your stack",
			description: "Two-way sync with the tools you use today, no scripts to babysit.",
			icon: ICON.layers,
		},
	],
	image: PRODUCT_SHOTS.payments,
};
