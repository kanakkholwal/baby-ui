<script lang="ts">
import { DateField } from "@baby-ui/svelte";
import type { DateValue } from "@internationalized/date";

let date = $state<DateValue | undefined>();
</script>

<DateField bind:value={date} aria-label="Date of birth" />
