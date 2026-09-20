<script lang="ts">
import { Command } from "@baby-ui/svelte";

let open = $state(false);
const items = [
	{ id: "new", label: "New project", group: "Actions", shortcut: "N" },
	{ id: "deploy", label: "Deploy", group: "Actions", shortcut: "D" },
	{ id: "docs", label: "Documentation", group: "Go to" },
];
</script>

<button type="button" onclick={() => (open = true)}>Open palette</button>

<Command bind:open {items} onselect={(id) => console.log(id)} />
