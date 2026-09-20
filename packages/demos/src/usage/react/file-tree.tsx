import { FileTree, type FileTreeNode } from "@baby-ui/react";

const tree: FileTreeNode[] = [
	{
		name: "src",
		children: [{ name: "app.tsx" }, { name: "main.ts" }],
	},
	{ name: "README.md" },
];

export function Example() {
	return <FileTree tree={tree} onSelect={(id) => console.log(id)} />;
}
