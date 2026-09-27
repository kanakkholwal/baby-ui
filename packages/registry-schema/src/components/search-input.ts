import { defineComponent } from "../index.ts";

export const searchInput = defineComponent({
	slug: "search-input",
	name: "Search Input",
	description:
		"A search field with a clear button, a spinner while results load, a shortcut that focuses it and a debounced onSearch.",
	category: "base",
	status: "beta",
	variants: { size: ["sm", "md", "lg"] },
	props: [
		{
			name: "value",
			type: "string",
			description: "Current query. Bindable in Svelte.",
			control: { kind: "none" },
		},
		{
			name: "onSearch",
			type: "(query: string) => void",
			description: "Runs once typing pauses, and at once on Enter or clear.",
			control: { kind: "none" },
		},
		{
			name: "debounceMs",
			type: "number",
			description: "Pause before onSearch runs.",
			default: 250,
			control: { kind: "none" },
		},
		{
			name: "loading",
			type: "boolean",
			description: "Shows a spinner in place of the search icon.",
			default: false,
			control: { kind: "boolean" },
		},
		{
			name: "shortcut",
			type: "string",
			description: "Key combo that focuses the field, e.g. `mod+k`.",
			control: { kind: "none" },
		},
		{
			name: "size",
			type: '"sm" | "md" | "lg"',
			description: "Field height.",
			default: "md",
			control: { kind: "select", options: ["sm", "md", "lg"] },
		},
	],
	a11y: {
		role: "searchbox",
		keyboard: [
			"Escape clears the query",
			"Enter searches at once",
			"The shortcut focuses the field",
		],
		notes: ["The spinner is a status with its own label while results load."],
	},
	impl: {
		react: {
			entry: "SearchInput",
			files: [
				{ path: "search-input/search-input.tsx", type: "registry:ui" },
				{ path: "search-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group", "shortcut", "spinner"],
		},
		svelte: {
			entry: "SearchInput",
			files: [
				{ path: "search-input/search-input.svelte", type: "registry:ui" },
				{ path: "search-input/variants.ts", type: "registry:ui" },
				{ path: "lib/cn.ts", type: "registry:lib" },
			],
			dependencies: ["clsx", "tailwind-merge", "tailwind-variants"],
			registryDependencies: ["input-group", "shortcut", "spinner"],
		},
	},
	keywords: ["search input", "search", "searchbox", "filter", "debounce", "shortcut"],
});
