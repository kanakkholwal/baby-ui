// Simple Icons in brand colour; each of these reads on both themes.
const icon = (slug: string) => `https://cdn.simpleicons.org/${slug}`;

const tool = (name: string, slug: string, description: string) => ({
	name,
	logo: icon(slug),
	description,
	href: "#",
	featured: false,
});

const TOOLS = [
	tool(
		"Stripe",
		"stripe",
		"Sync customers, invoices and failed payments into each account.",
	),
	tool(
		"Figma",
		"figma",
		"Attach live frames to tasks and see edits without leaving the board.",
	),
	tool(
		"Supabase",
		"supabase",
		"Pipe rows into views and trigger workflows on new records.",
	),
	tool(
		"Linear",
		"linear",
		"Two-way sync issues, states and assignees with your roadmap.",
	),
	tool("Discord", "discord", "Post updates to a channel and turn messages into tasks."),
	tool(
		"Google Drive",
		"googledrive",
		"Preview docs inline and keep files with the work they belong to.",
	),
	tool("Zapier", "zapier", "Connect the long tail of tools with no code at all."),
	tool("HubSpot", "hubspot", "See deal stage and owner beside every customer request."),
];

export const INTEGRATION_SECTION = {
	title: "Works with the tools you already use",
	description:
		"Connect your stack in a couple of clicks; every integration syncs both ways and runs on our infrastructure.",
	link: "Learn more",
	// Your own product sits in the middle: the centre card, and the centre tile of the cluster.
	items: [
		...TOOLS.slice(0, 4),
		{
			name: "Acme",
			logo: "",
			description:
				"The hub every integration syncs through, with one audit log for all of it.",
			href: "#",
			featured: true,
		},
		...TOOLS.slice(4),
	],
};

/** The product's own mark, drawn inline for the featured item. */
export const INTEGRATION_MARK =
	"M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm0 0v18M4 7.5l8 4.5 8-4.5";
