<script lang="ts">
import { DropdownMenu } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let last = $state("");

const items = [
	{ id: "rename", label: "Rename" },
	{ id: "duplicate", label: "Duplicate" },
	{ id: "archive", label: "Archive", disabled: true },
	{ id: "delete", label: "Delete", destructive: true },
];
</script>

<div class="flex flex-col items-center gap-3">
	<DropdownMenu
		{items}
		placement={(props.placement as never) ?? "bottom-start"}
		onselect={(id) => (last = id)}
	>
		{#snippet trigger()}
			<span class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm">Actions</span>
		{/snippet}
	</DropdownMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
