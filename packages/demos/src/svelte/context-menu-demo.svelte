<script lang="ts">
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@baby-ui/svelte";

let last = $state("");
</script>

<div class="flex flex-col items-center gap-3">
	<ContextMenu>
		<ContextMenuTrigger>
			<div
				class="grid size-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm"
			>
				Right-click anywhere here
			</div>
		</ContextMenuTrigger>
		<ContextMenuContent>
			<ContextMenuItem onclick={() => (last = "open")}>
				Open in editor
				<ContextMenuShortcut>⏎</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuItem onclick={() => (last = "copy")}>
				Copy path
				<ContextMenuShortcut>⌘C</ContextMenuShortcut>
			</ContextMenuItem>
			<ContextMenuSeparator />
			<ContextMenuSub>
				<ContextMenuSubTrigger>Arrange</ContextMenuSubTrigger>
				<ContextMenuSubContent>
					<ContextMenuItem onclick={() => (last = "bring-to-front")}>Bring to front</ContextMenuItem>
					<ContextMenuItem onclick={() => (last = "bring-forward")}>Bring forward</ContextMenuItem>
					<ContextMenuItem onclick={() => (last = "send-backward")}>Send backward</ContextMenuItem>
					<ContextMenuItem onclick={() => (last = "send-to-back")}>Send to back</ContextMenuItem>
				</ContextMenuSubContent>
			</ContextMenuSub>
			<ContextMenuSeparator />
			<ContextMenuItem destructive onclick={() => (last = "delete")}>
				Delete
				<ContextMenuShortcut>⌫</ContextMenuShortcut>
			</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
