<script lang="ts">
import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuRadioGroup,
	ContextMenuRadioItem,
	ContextMenuSeparator,
	ContextMenuShortcut,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();
let last = $state("");
let grid = $state(true);
let sort = $state("name");
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
			<ContextMenuCheckboxItem bind:checked={grid}>Show grid</ContextMenuCheckboxItem>
			<ContextMenuLabel inset>Sort by</ContextMenuLabel>
			<ContextMenuRadioGroup bind:value={sort}>
				<ContextMenuRadioItem value="name">Name</ContextMenuRadioItem>
				<ContextMenuRadioItem value="date">Date modified</ContextMenuRadioItem>
			</ContextMenuRadioGroup>
			<ContextMenuSeparator />
			<ContextMenuItem variant="destructive" onclick={() => (last = "delete")}>
				Delete
				<ContextMenuShortcut>⌫</ContextMenuShortcut>
			</ContextMenuItem>
		</ContextMenuContent>
	</ContextMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
