<script lang="ts">
import { AlertDialog } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let done = $state(false);
</script>

<div class="flex flex-col items-center gap-3">
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Delete project</button>
	{#if done}<p class="text-muted-foreground text-xs">Confirmed</p>{/if}
</div>

<AlertDialog
	bind:open
	title={(props.title as string) || "Delete this project?"}
	description={(props.description as string) ||
		"This removes every deployment and cannot be undone."}
	confirmLabel={(props.confirmLabel as string) || "Delete"}
	destructive={props.destructive !== false}
	onconfirm={() => (done = true)}
/>
