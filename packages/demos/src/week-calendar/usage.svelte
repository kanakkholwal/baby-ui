<script lang="ts">
import { WeekCalendar } from "@baby-ui/svelte";

let selected = $state<Date | null>(new Date());
</script>

<WeekCalendar bind:selected />
