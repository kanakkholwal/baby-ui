<script lang="ts">
import { MultiSelect } from "@baby-ui/svelte";

const people = [
	{ value: "ana", label: "Ana Ruiz" },
	{ value: "ben", label: "Ben Okafor" },
	{ value: "dev", label: "Dev Patel" },
];
let value = $state<string[]>([]);
</script>

<MultiSelect aria-label="Reviewers" options={people} bind:value />
