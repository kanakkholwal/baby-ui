<script lang="ts">
import { Combobox } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state("");

const options = [
	{ value: "ams", label: "Amsterdam" },
	{ value: "blr", label: "Bengaluru" },
	{ value: "fra", label: "Frankfurt" },
	{ value: "iad", label: "Washington DC" },
	{ value: "nrt", label: "Tokyo" },
	{ value: "syd", label: "Sydney" },
];
</script>

<Combobox
	{options}
	bind:value
	placeholder={(props.placeholder as string) || "Search regions…"}
	emptyLabel={(props.emptyLabel as string) || "No matches"}
	label="Region"
/>
