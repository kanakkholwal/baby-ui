<script lang="ts">
import { NumberInput } from "@baby-ui/svelte";

let seats = $state<number | null>(5);
</script>

<NumberInput label="Seats" bind:value={seats} min={1} max={50} />
