<script lang="ts">
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "@baby-ui/svelte";

let last = $state("");
</script>

<div class="flex flex-col items-center gap-3">
	<ContextMenu>
		<ContextMenuTrigger>
			<div
				class="grid h-28 w-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm"
			>
				Right-click anywhere here
			</div>
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem onclick={() => (last = "open")}>Open in editor</ContextMenuItem>
			<ContextMenuItem onclick={() => (last = "copy")}>Copy path</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuItem destructive onclick={() => (last = "delete")}>Delete</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
