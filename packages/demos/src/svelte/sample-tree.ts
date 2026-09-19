import type { FileTreeNode } from "@baby-ui/svelte";

export const SAMPLE_TREE: FileTreeNode[] = [
	{
		name: "src",
		children: [
			{
				name: "routes",
				children: [{ name: "+layout.svelte" }, { name: "+page.svelte" }],
			},
			{ name: "lib", children: [{ name: "cn.ts" }, { name: "tokens.css" }] },
			{ name: "app.html" },
		],
	},
	{ name: "package.json" },
	{ name: "vite.config.ts" },
];
