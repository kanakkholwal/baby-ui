<script lang="ts">
import { ContextMenu } from "@baby-ui/svelte";

const items = [
	{ id: "rename", label: "Rename" },
	{ id: "duplicate", label: "Duplicate" },
	{ id: "delete", label: "Delete", destructive: true },
];
</script>

<ContextMenu {items} onselect={(id) => console.log(id)}>
	<div class="grid h-32 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm">
		Right-click anywhere here
	</div>
</ContextMenu>
