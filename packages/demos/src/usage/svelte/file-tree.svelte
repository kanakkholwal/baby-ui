<script lang="ts">
import { FileTree, type FileTreeNode } from "@baby-ui/svelte";

const tree: FileTreeNode[] = [
	{
		name: "src",
		children: [{ name: "app.svelte" }, { name: "main.ts" }],
	},
	{ name: "README.md" },
];
</script>

<FileTree {tree} onselect={(id) => console.log(id)} />
