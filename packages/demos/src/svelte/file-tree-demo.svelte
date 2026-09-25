<script lang="ts">
import { FileTree, type FileTreeSize } from "@baby-ui/svelte";
import { SAMPLE_TREE } from "./sample-tree";

let { props = {} }: { props?: Record<string, unknown> } = $props();
</script>

<FileTree
	tree={SAMPLE_TREE}
	indent={Number(props.indent ?? 14)}
	showGuides={props.showGuides !== false}
	defaultExpanded={props.defaultExpanded !== false}
	size={(props.size as FileTreeSize) ?? "md"}
	class="w-64"
/>
