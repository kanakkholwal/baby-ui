<script lang="ts">
import { TimePicker, type TimePickerSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let time = $state<string | null>("09:30");
const cycle = $derived(
	props.hourCycle === "24" ? 24 : props.hourCycle === "12" ? 12 : undefined,
);
</script>

<div class="flex w-fit flex-col gap-2">
	<span class="font-medium text-sm">Meeting starts</span>
	<TimePicker
		bind:value={time}
		aria-label="Meeting starts"
		hourCycle={cycle}
		step={Number(props.step ?? 15)}
		size={(props.size as TimePickerSize) ?? "md"}
	/>
	<p class="text-muted-foreground text-xs tabular-nums">Saved as {time ?? "no time"}</p>
</div>
