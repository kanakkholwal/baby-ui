<script lang="ts">
import { type CalendarSize, RangeCalendar } from "@baby-ui/svelte";
import { getLocalTimeZone, today } from "@internationalized/date";
import { MediaQuery } from "svelte/reactivity";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const start = today(getLocalTimeZone());
let value = $state({ start, end: start.add({ days: 5 }) });
// Two months side by side on wide screens, one on a phone.
const wide = new MediaQuery("min-width: 768px");
</script>

<RangeCalendar
	bind:value
	numberOfMonths={wide.current ? 2 : 1}
	size={(props.size as CalendarSize) ?? "md"}
	class="rounded-lg border border-border"
/>
