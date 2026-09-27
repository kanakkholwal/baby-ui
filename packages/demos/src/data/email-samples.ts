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
	heroImageUrl: "https://picsum.photos/id/1/864/480",
	heroImageAlt: "A laptop on a desk showing the Northwind dashboard",
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
	reason: "You are receiving this because you created a Northwind account.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

const REQUEST_DETAILS = [
	{ label: "Device", value: "Chrome on macOS" },
	{ label: "Location", value: "Lisbon, Portugal" },
	{ label: "Time", value: "Sep 27, 2026 at 14:32 UTC" },
];

export const EMAIL_VERIFY = {
	recipientEmail: "ada@lovelace.example",
	verifyUrl: "https://northwind.example/verify?token=5f2c9a",
	expiresIn: "24 hours",
	code: "482913",
	helpItems: [
		{ text: "help@northwind.example" },
		{ text: "+1 (415) 555 0132" },
		{ text: "Monday to Friday, 9:00 to 18:00 PT" },
	],
	reason:
		"You are receiving this because someone signed up for Northwind with this address.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

export const EMAIL_MAGIC_LINK = {
	signInUrl: "https://northwind.example/auth/magic?token=91be07",
	expiresIn: "10 minutes",
	code: "730 184",
	requestDetails: REQUEST_DETAILS,
	reason:
		"You are receiving this because a sign-in was requested for your Northwind account.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

export const EMAIL_PASSWORD_RESET = {
	recipientEmail: "ada@lovelace.example",
	resetUrl: "https://northwind.example/reset?token=c41d88",
	requestedAt: "Sep 27, 2026, 14:32 UTC",
	expiresIn: "1 hour",
	requestDetails: REQUEST_DETAILS,
	securityUrl: "https://northwind.example/settings/security",
	reason:
		"You are receiving this because a password reset was requested for your account.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

export const EMAIL_TEAM_INVITE = {
	inviterName: "Grace Hopper",
	inviterEmail: "grace@analytical.example",
	teamName: "Analytical Engines",
	role: "Editor",
	message:
		"We're moving our weekly reporting into Northwind. Join so you can review the Q4 dashboards before Friday.",
	acceptUrl: "https://northwind.example/invite/accept?token=0e7f21",
	expiresIn: "7 days",
	reason:
		"You are receiving this because Grace Hopper invited this address to Northwind.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

export const EMAIL_RECEIPT = {
	receiptNumber: "NW-2026-0931",
	date: "Sep 27, 2026",
	items: [
		{ label: "Northwind Pro, monthly (5 seats)", value: "$120.00" },
		{ label: "Extra data sync, 50 GB", value: "$10.00" },
	],
	adjustments: [
		{ label: "Annual discount (10%)", value: "-$13.00" },
		{ label: "VAT (23%)", value: "$26.91" },
	],
	total: "$143.91",
	paymentMethod: "Visa ending 4242",
	billingLines: [
		"Analytical Engines Ltd.",
		"Rua Augusta 27",
		"1100-048 Lisbon, Portugal",
	],
	invoiceUrl: "https://northwind.example/billing/invoices/NW-2026-0931",
	billingEmail: "billing@northwind.example",
	reason: "You are receiving this because you have a paid Northwind subscription.",
	companyLines: COMPANY,
	footerLinks: FOOTER_LINKS,
};

/** Every email preview sample, keyed by slug, for the build-time renderer. */
export const EMAIL_SAMPLES: Record<string, Record<string, unknown>> = {
	"email-welcome": EMAIL_WELCOME,
	"email-verify": EMAIL_VERIFY,
	"email-magic-link": EMAIL_MAGIC_LINK,
	"email-password-reset": EMAIL_PASSWORD_RESET,
	"email-team-invite": EMAIL_TEAM_INVITE,
	"email-receipt": EMAIL_RECEIPT,
};
