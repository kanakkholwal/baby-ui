<script lang="ts">
import { DateRangePicker } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";

let range = $state<ComponentProps<typeof DateRangePicker>["value"]>();
</script>

<DateRangePicker bind:value={range} aria-label="Report period" />
