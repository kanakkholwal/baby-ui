<script lang="ts">
import { Command } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let open = $state(false);
let last = $state("");

const items = [
	{ id: "deploy", label: "Deploy to production", shortcut: "D" },
	{ id: "rollback", label: "Roll back last deploy", shortcut: "R" },
	{ id: "logs", label: "Open runtime logs", shortcut: "L" },
	{ id: "settings", label: "Project settings" },
	{ id: "invite", label: "Invite a teammate" },
];
</script>

<div class="flex flex-col items-center gap-3">
	<button type="button" class="inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 font-medium text-foreground text-sm" onclick={() => (open = true)}>Open palette</button>
	{#if last}<p class="text-muted-foreground text-xs">Ran: {last}</p>{/if}
</div>

<Command
	{items}
	bind:open
	placeholder={(props.placeholder as string) || "Type a command or search…"}
	emptyLabel={(props.emptyLabel as string) || "No results"}
	onselect={(id) => (last = id)}
/>
