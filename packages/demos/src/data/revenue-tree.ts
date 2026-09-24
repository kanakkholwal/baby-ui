/** Sample revenue split by region, country and plan for sunburst demos; names match the config. */
export const REVENUE_TREE = {
	name: "Revenue",
	children: [
		{
			name: "americas",
			children: [
				{
					name: "United States",
					children: [
						{ name: "Enterprise", value: 4200 },
						{ name: "Team", value: 2600 },
						{ name: "Starter", value: 900 },
					],
				},
				{
					name: "Canada",
					children: [
						{ name: "Team", value: 1100 },
						{ name: "Starter", value: 450 },
					],
				},
				{ name: "Brazil", value: 780 },
			],
		},
		{
			name: "europe",
			children: [
				{
					name: "Germany",
					children: [
						{ name: "Enterprise", value: 1900 },
						{ name: "Team", value: 1200 },
					],
				},
				{ name: "France", value: 1300 },
				{ name: "Spain", value: 640 },
			],
		},
		{
			name: "asia",
			children: [
				{
					name: "Japan",
					children: [
						{ name: "Enterprise", value: 1500 },
						{ name: "Team", value: 700 },
					],
				},
				{ name: "India", value: 1250 },
			],
		},
		{ name: "oceania", children: [{ name: "Australia", value: 820 }] },
	],
};

export const REVENUE_TREE_CONFIG = {
	americas: { label: "Americas", color: "var(--chart-1)" },
	europe: { label: "Europe", color: "var(--chart-2)" },
	asia: { label: "Asia", color: "var(--chart-3)" },
	oceania: { label: "Oceania", color: "var(--chart-4)" },
};

/** Sample signup funnel for funnel demos. */
export const SIGNUP_FUNNEL = [
	{ label: "Visitors", value: 12400 },
	{ label: "Signed up", value: 5310 },
	{ label: "Activated", value: 2860 },
	{ label: "Subscribed", value: 940 },
	{ label: "Renewed", value: 610 },
];
