<script lang="ts">
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@baby-ui/svelte";
</script>

<ContextMenu>
	<ContextMenuTrigger>
		<div class="grid h-32 place-items-center rounded-xl border border-border border-dashed">
			Right-click anywhere here
		</div>
	</ContextMenuTrigger>
	<ContextMenuContent>
		<ContextMenuItem>Rename</ContextMenuItem>
		<ContextMenuItem>Duplicate</ContextMenuItem>
		<ContextMenuSeparator />
		<ContextMenuItem destructive>Delete</ContextMenuItem>
	</ContextMenuContent>
</ContextMenu>
