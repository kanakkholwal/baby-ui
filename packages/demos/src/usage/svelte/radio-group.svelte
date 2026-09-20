<script lang="ts">
import { RadioGroup } from "@baby-ui/svelte";

let value = $state("hobby");
const options = [
	{ value: "hobby", label: "Hobby", description: "For side projects." },
	{ value: "pro", label: "Pro", description: "For teams shipping daily." },
];
</script>

<RadioGroup bind:value {options} variant="card" name="plan" />
