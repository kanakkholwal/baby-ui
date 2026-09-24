<script lang="ts">
import { WheelPicker, WheelPickerColumn } from "@baby-ui/svelte";

let hour = $state("10");
</script>

<WheelPicker aria-label="Time">
	<WheelPickerColumn options={["9", "10", "11"]} bind:value={hour} aria-label="Hour" />
	<WheelPickerColumn options={["AM", "PM"]} defaultValue="AM" aria-label="Period" />
</WheelPicker>
