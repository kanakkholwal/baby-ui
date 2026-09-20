<script lang="ts">
import { ToggleGroup } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state<string | string[]>("grid");

const options = [
	{ value: "list", label: "List" },
	{ value: "grid", label: "Grid" },
	{ value: "board", label: "Board" },
];
</script>

<ToggleGroup
	{options}
	bind:value
	multiple={Boolean(props.multiple)}
	disabled={Boolean(props.disabled)}
	label="View"
/>
