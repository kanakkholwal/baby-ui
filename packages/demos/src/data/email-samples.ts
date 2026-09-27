// Fictional sender for every email preview; control props come from each spec's defaults.
const COMPANY = [
	"Northwind Labs, Inc.",
	"548 Market St, Suite 300, San Francisco, CA 94104",
];
const FOOTER_LINKS = [
	{
		label: "Notification settings",
		href: "https://northwind.example/settings/notifications",
	},
	{ label: "Privacy", href: "https://northwind.example/privacy" },
];

export const EMAIL_WELCOME = {
	actionUrl: "https://northwind.example/dashboard",
	steps: [
		{
			title: "Connect your data source",
			description:
				"Link Postgres, BigQuery or a CSV upload. Most teams are syncing in under five minutes.",
		},
		{
			title: "Invite your team",
			description: "Teammates you add join your workspace with the role you choose.",
		},
		{
			title: "Build your first report",
			description: "Start from a template or a blank canvas, then share it with a link.",
		},
	],
	supportEmail: "help@northwind.example",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

/** Every email preview sample, keyed by slug, for the build-time renderer. */
export const EMAIL_SAMPLES: Record<string, Record<string, unknown>> = {
	"email-welcome": EMAIL_WELCOME,
};
