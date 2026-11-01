<script lang="ts">
import {
	InlineEdit,
	InlineEditArea,
	InlineEditInput,
	InlineEditMessage,
	InlineEditPreview,
	InlineEditStatus,
} from "@baby-ui/svelte";

let { name, rename }: { name: string; rename: (next: string) => Promise<void> } =
	$props();
</script>

<InlineEdit label="Project name" value={name} onSave={rename}>
	<InlineEditArea>
		<InlineEditPreview as="h2" />
		<InlineEditInput />
		<InlineEditStatus />
	</InlineEditArea>
	<InlineEditMessage />
</InlineEdit>
