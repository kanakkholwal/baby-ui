<script lang="ts">
import { Field, FieldDescription, FieldLabel, TimePicker } from "@baby-ui/svelte";

let time = $state<string | null>("09:30");
</script>

<Field class="w-fit">
	<FieldLabel>Start time</FieldLabel>
	<TimePicker
		bind:value={time}
		step={15}
		min="08:00"
		max="18:00"
		clearable
		showNow
		aria-label="Start time"
		aria-describedby="start-time-hint"
	/>
	<FieldDescription id="start-time-hint">
		Type it, or use the arrow keys. Clear and Now sit at the end.
	</FieldDescription>
</Field>