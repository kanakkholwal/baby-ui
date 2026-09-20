<script lang="ts">
import { Select } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("edge");

const options = [
	{ value: "edge", label: "Edge runtime" },
	{ value: "node", label: "Node runtime" },
	{ value: "static", label: "Static export" },
	{ value: "hybrid", label: "Hybrid", disabled: true },
];
</script>

<div class="w-64">
	<Select
		{options}
		bind:value
		placeholder={(props.placeholder as string) || "Select an option"}
		placement={(props.placement as never) ?? "bottom-start"}
		label="Runtime"
	/>
</div>
