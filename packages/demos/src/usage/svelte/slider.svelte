<script lang="ts">
import { Slider } from "@baby-ui/svelte";

let value = $state(40);
</script>

<Slider bind:value min={0} max={100} step={5} label="Volume" />
