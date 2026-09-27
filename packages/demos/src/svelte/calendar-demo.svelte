<script lang="ts">
import { Calendar, type CalendarCaptionLayout, type CalendarSize } from "@baby-ui/svelte";
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state<DateValue | undefined>(today(getLocalTimeZone()));
</script>

<Calendar
	type="single"
	bind:value
	captionLayout={(props.captionLayout as CalendarCaptionLayout) ?? "dropdown"}
	size={(props.size as CalendarSize) ?? "md"}
	class="rounded-lg border border-border"
/>
