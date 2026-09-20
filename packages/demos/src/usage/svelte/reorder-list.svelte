<script lang="ts">
import { ReorderList } from "@baby-ui/svelte";

let items = $state([
	{ id: "spec", label: "Write the ComponentSpec" },
	{ id: "svelte", label: "Author the Svelte port" },
	{ id: "react", label: "Author the React port" },
]);
</script>

<ReorderList bind:items label="Build steps" />
