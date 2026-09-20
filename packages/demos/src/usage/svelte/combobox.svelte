<script lang="ts">
import { Combobox } from "@baby-ui/svelte";

let value = $state("");
const options = [
	{ value: "iad1", label: "Washington, D.C." },
	{ value: "fra1", label: "Frankfurt" },
	{ value: "bom1", label: "Mumbai" },
];
</script>

<Combobox bind:value {options} label="Region" placeholder="Search regions…" />
