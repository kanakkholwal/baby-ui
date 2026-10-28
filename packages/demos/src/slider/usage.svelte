<script lang="ts">
import { Slider } from "@baby-ui/svelte";

let hours = $state(120);
</script>

<Slider
	bind:value={hours}
	variant="track"
	min={10}
	max={400}
	step={10}
	label="Build time"
	showValue
	formatValue={(v) => `${v} hours`}
/>
