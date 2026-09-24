<script lang="ts">
import { WheelPicker, WheelPickerColumn, type WheelPickerRows } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const hours = Array.from({ length: 12 }, (_, i) => String(i + 1));
const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const periods = ["AM", "PM"];
const rows = $derived((props.rows as WheelPickerRows) ?? "5");
const itemHeight = $derived(Number(props.itemHeight ?? 44));
</script>

{#key `${rows}-${itemHeight}`}
	<WheelPicker
		{rows}
		{itemHeight}
		lens={props.lens !== false}
		aria-label="Time"
		class="w-64 rounded-2xl border bg-card p-2"
	>
		<WheelPickerColumn
			options={hours}
			defaultValue="9"
			loop={props.loop === true}
			disabled={props.disabled === true}
			aria-label="Hour"
		/>
		<WheelPickerColumn
			options={minutes}
			defaultValue="41"
			loop={props.loop === true}
			disabled={props.disabled === true}
			aria-label="Minute"
		/>
		<WheelPickerColumn options={periods} defaultValue="AM" aria-label="Period" />
	</WheelPicker>
{/key}
