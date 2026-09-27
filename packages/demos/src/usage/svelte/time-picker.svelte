<script lang="ts">
import { TimePicker } from "@baby-ui/svelte";

let time = $state<string | null>("09:30");
</script>

<TimePicker bind:value={time} step={15} aria-label="Start time" />
