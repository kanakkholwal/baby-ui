<script lang="ts">
import { Calendar } from "@baby-ui/svelte";
import { type DateValue, getLocalTimeZone, today } from "@internationalized/date";

let value = $state<DateValue | undefined>(today(getLocalTimeZone()));
</script>

<Calendar type="single" bind:value captionLayout="dropdown" />
