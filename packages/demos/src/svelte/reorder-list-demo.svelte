<script lang="ts">
import { ReorderList } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let items = $state([
	{ id: "spec", label: "Write the ComponentSpec" },
	{ id: "svelte", label: "Author the Svelte port" },
	{ id: "react", label: "Author the React port" },
	{ id: "docs", label: "Write the doc page" },
]);
</script>

<div class="w-80">
	<ReorderList
		bind:items
		disabled={Boolean(props.disabled)}
		label={(props.label as string) || "Build steps"}
	/>
</div>
