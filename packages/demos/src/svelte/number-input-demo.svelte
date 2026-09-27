<script lang="ts">
import { NumberInput, type NumberInputSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const size = $derived((props.size as NumberInputSize) ?? "md");
let seats = $state<number | null>(5);
let budget = $state<number | null>(1200);
</script>

<div class="flex w-full max-w-60 flex-col gap-5">
	<NumberInput label="Seats" bind:value={seats} min={1} max={50} {size} disabled={Boolean(props.disabled)} />
	<NumberInput
		label="Monthly budget"
		bind:value={budget}
		min={0}
		step={50}
		largeStep={500}
		formatOptions={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
		{size}
		disabled={Boolean(props.disabled)}
	/>
</div>
