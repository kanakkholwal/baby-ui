<script lang="ts">
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let last = $state("");
</script>

<div class="flex flex-col items-center gap-3">
	<DropdownMenu placement={(props.placement as never) ?? "bottom-start"}>
		<DropdownMenuTrigger class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Actions</DropdownMenuTrigger>
		<DropdownMenuContent>
			<DropdownMenuLabel>This file</DropdownMenuLabel>
			<DropdownMenuItem onclick={() => (last = "rename")}>Rename</DropdownMenuItem>
			<DropdownMenuItem onclick={() => (last = "duplicate")}>Duplicate</DropdownMenuItem>
			<DropdownMenuItem disabled>Archive</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem destructive onclick={() => (last = "delete")}>Delete</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
