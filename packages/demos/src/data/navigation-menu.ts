/** Sample site map for the navigation-menu demos; real apps pass their own. */
export const NAV_MENU_SAMPLE = [
	{
		label: "Product",
		links: [
			{
				href: "#analytics",
				title: "Analytics",
				description: "Dashboards built on your events.",
			},
			{
				href: "#alerts",
				title: "Alerts",
				description: "Slack and email when a metric moves.",
			},
			{
				href: "#warehouse",
				title: "Warehouse sync",
				description: "Postgres, BigQuery, Snowflake.",
			},
		],
	},
	{
		label: "Resources",
		links: [
			{ href: "#docs", title: "Docs", description: "Guides and API reference." },
			{ href: "#changelog", title: "Changelog", description: "What shipped this week." },
		],
	},
] as const;

export const NAV_MENU_LINKS = [{ href: "#pricing", label: "Pricing" }] as const;
