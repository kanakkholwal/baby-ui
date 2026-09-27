<script lang="ts">
import { DateRangePicker, type DateRangePickerSize } from "@baby-ui/svelte";
import type { ComponentProps } from "svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

// A report filter: empty until the reader picks a range or a preset.
let range = $state<ComponentProps<typeof DateRangePicker>["value"]>();
</script>

<div class="w-full max-w-64">
	<DateRangePicker
		bind:value={range}
		aria-label="Report period"
		confirm={props.confirm === true}
		locale={(props.locale as string) || undefined}
		size={(props.size as DateRangePickerSize) ?? "md"}
	/>
</div>
