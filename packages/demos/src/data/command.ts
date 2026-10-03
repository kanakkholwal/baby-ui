/** Sample palette for the Command demos: three groups, each a filter in the launcher. */
export const COMMAND_GROUPS = [
	{
		id: "actions",
		heading: "Actions",
		icon: "M8 3.5v9M3.5 8h9",
		items: [
			{ value: "New project", keywords: "create", shortcut: "N" },
			{ value: "Deploy", keywords: "ship release", shortcut: "D" },
			{ value: "Invite teammate", keywords: "member people", shortcut: "I" },
		],
	},
	{
		id: "pages",
		heading: "Pages",
		icon: "M4.5 2.5h4.5l3 3v8h-7.5Zm4.5 0v3h3",
		items: [
			{ value: "Dashboards", keywords: "overview" },
			{ value: "Documentation", keywords: "docs guide" },
			{ value: "Changelog", keywords: "releases" },
			{ value: "Status page", keywords: "uptime incidents" },
		],
	},
	{
		id: "settings",
		heading: "Settings",
		icon: "M8 5.8a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM8 1.8v1.6m0 9.2v1.6M1.8 8h1.6m9.2 0h1.6",
		items: [
			{ value: "Billing", keywords: "plan invoices" },
			{ value: "API keys", keywords: "token secret" },
			{ value: "Appearance", keywords: "theme dark light" },
		],
	},
];

/** Every group at once; the first launcher filter. */
export const COMMAND_ALL = {
	id: "all",
	heading: "All",
	icon: "M3 3h4v4H3Zm6 0h4v4H9ZM3 9h4v4H3Zm6 0h4v4H9Z",
};
