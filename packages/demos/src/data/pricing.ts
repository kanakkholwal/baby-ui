export const PRICING_PERIODS = [
	{ value: "monthly", label: "Monthly", cadence: "/month" },
	{ value: "yearly", label: "Yearly, save 20%", cadence: "/year" },
];

export const PRICING_PLANS_01 = [
	{
		id: "starter",
		name: "Starter",
		prices: { monthly: "$0", yearly: "$0" },
		description:
			"For personal projects and early ideas that need a polished place to begin.",
		features: [
			"Up to 3 active projects",
			"Core analytics",
			"Community support",
			"Unlimited collaborators",
		],
		note: "Start building. No card needed.",
	},
	{
		id: "studio",
		name: "Studio",
		prices: { monthly: "$29", yearly: "$278" },
		description: "For small teams shipping client work and growing products every week.",
		features: [
			"Unlimited active projects",
			"Advanced analytics",
			"Priority email support",
			"Custom domains",
		],
		note: "Everything your team needs to move.",
		badge: "Popular",
		featured: true,
	},
	{
		id: "scale",
		name: "Scale",
		prices: { monthly: "$99", yearly: "$950" },
		description:
			"For established teams that need more control, support, and room to grow.",
		features: [
			"Everything in Studio",
			"Single sign-on",
			"Dedicated onboarding",
			"Custom usage limits",
		],
		note: "More control, without more complexity.",
	},
];

export const PRICING_PLANS_02 = [
	{
		id: "starter",
		name: "Starter",
		prices: { monthly: "$0", yearly: "$0" },
		description: "For personal projects and ideas taking their first shape.",
		features: [
			"3 active projects",
			"Unlimited collaborators",
			"Core analytics",
			"Community support",
			"7-day version history",
			"Standard integrations",
		],
		featuresLabel: "Starter includes",
		cta: "Start for free",
	},
	{
		id: "studio",
		name: "Studio",
		prices: { monthly: "$32", yearly: "$307" },
		description: "For small teams building and shipping every week.",
		features: [
			"Unlimited projects",
			"Custom domains",
			"Advanced analytics",
			"Priority support",
			"Unlimited version history",
			"Team permissions",
		],
		featuresLabel: "Everything in Starter, plus",
		cta: "Choose Studio",
		featured: true,
	},
	{
		id: "scale",
		name: "Scale",
		prices: { monthly: "$96", yearly: "$922" },
		description: "For growing organizations that need control and support.",
		features: [
			"Everything in Studio",
			"Single sign-on",
			"Audit logs",
			"Dedicated onboarding",
			"Custom data retention",
			"Enterprise integrations",
		],
		featuresLabel: "Everything in Studio, plus",
		cta: "Choose Scale",
	},
];
