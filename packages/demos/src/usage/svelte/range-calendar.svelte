<script lang="ts">
import { RangeCalendar } from "@baby-ui/svelte";
import { getLocalTimeZone, today } from "@internationalized/date";

const start = today(getLocalTimeZone());
let value = $state({ start, end: start.add({ days: 3 }) });
</script>

<RangeCalendar bind:value numberOfMonths={2} />
