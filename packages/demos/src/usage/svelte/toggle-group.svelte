<script lang="ts">
import { ToggleGroup } from "@baby-ui/svelte";

let value = $state("left");
const options = [
	{ value: "left", label: "Left" },
	{ value: "center", label: "Center" },
	{ value: "right", label: "Right" },
];
</script>

<ToggleGroup bind:value {options} label="Alignment" />
