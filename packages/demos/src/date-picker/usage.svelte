<script lang="ts">
import { DatePicker } from "@baby-ui/svelte";
import type { DateValue } from "@internationalized/date";

let date = $state<DateValue | undefined>();
</script>

<DatePicker bind:value={date} aria-label="Due date" />
