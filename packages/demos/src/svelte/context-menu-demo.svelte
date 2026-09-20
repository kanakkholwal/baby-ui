<script lang="ts">
import { ContextMenu } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let last = $state("");

const items = [
	{ id: "open", label: "Open in editor" },
	{ id: "copy", label: "Copy path" },
	{ id: "delete", label: "Delete", destructive: true },
];
</script>

<div class="flex flex-col items-center gap-3">
	<ContextMenu {items} onselect={(id) => (last = id)}>
		<div
			class="grid h-28 w-64 place-items-center rounded-xl border border-border border-dashed text-muted-foreground text-sm"
		>
			Right-click anywhere here
		</div>
	</ContextMenu>
	{#if last}<p class="text-muted-foreground text-xs">Selected: {last}</p>{/if}
</div>
