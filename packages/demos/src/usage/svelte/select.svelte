<script lang="ts">
import { Select } from "@baby-ui/svelte";

let value = $state("");
const options = [
	{ value: "node", label: "Node 22" },
	{ value: "bun", label: "Bun 1.2" },
	{ value: "deno", label: "Deno 2", disabled: true },
];
</script>

<Select bind:value {options} label="Runtime" placeholder="Pick a runtime" />
