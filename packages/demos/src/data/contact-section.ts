export const CONTACT_SECTION = {
	title: "Talk to a person, not a queue",
	description:
		"Tell us what you are building and we will route you to someone who can help, usually within a working day.",
	channels: [
		{
			title: "Sales",
			link: { label: "sales@acme.dev", href: "mailto:sales@acme.dev" },
			detail: "Plans, invoices and volume pricing",
		},
		{
			title: "Support",
			link: { label: "help@acme.dev", href: "mailto:help@acme.dev" },
			detail: "Replies in under four hours on weekdays",
		},
		{
			title: "Press",
			link: { label: "press@acme.dev", href: "mailto:press@acme.dev" },
			detail: "Logos, screenshots and interviews",
		},
	],
	form: {
		title: "Send us a note",
		description: "We read every message and never add you to a list.",
		topics: ["A question about pricing", "Help with my account", "A partnership idea"],
		submit: "Send message",
		sent: (name: string) =>
			`Thanks ${name}, we will reply by email within a working day.`,
	},
};
