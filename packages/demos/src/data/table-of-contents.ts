// Ids carry a prefix so the demo never collides with the headings of the page that hosts it.
export const TOC_ARTICLE = [
	{
		id: "toc-demo-start",
		label: "Getting started",
		depth: 2,
		body: "Pick a framework, run the CLI and the component lands in your project as source you own.",
	},
	{
		id: "toc-demo-install",
		label: "Install the CLI",
		depth: 3,
		body: "One command adds the file, its variants and any registry dependencies it composes.",
	},
	{
		id: "toc-demo-configure",
		label: "Configure paths",
		depth: 3,
		body: "Aliases in components.json decide where files go, so imports match your project layout.",
	},
	{
		id: "toc-demo-theming",
		label: "Theming",
		depth: 2,
		body: "Every colour and duration is a CSS variable, so one token change restyles every component.",
	},
	{
		id: "toc-demo-tokens",
		label: "Colour tokens",
		depth: 3,
		body: "Semantic tokens such as primary and muted map to your palette in light and dark mode.",
	},
	{
		id: "toc-demo-motion",
		label: "Motion tokens",
		depth: 3,
		body: "Entrances and exits read shared durations and easings, and reduced motion shortens them.",
	},
	{
		id: "toc-demo-deploy",
		label: "Ship it",
		depth: 2,
		body: "Components are plain source files, so they build and deploy with the rest of your app.",
	},
] as const;

export const TOC_ITEMS = TOC_ARTICLE.map(({ id, label, depth }) => ({
	id,
	label,
	depth,
}));
