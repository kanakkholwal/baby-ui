<script lang="ts">
import { Slider } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let orientation = $derived(
	(props.orientation as "horizontal" | "vertical") ?? "horizontal",
);
let range = $derived(Boolean(props.range));
let value = $state<number | number[]>(50);

$effect(() => {
	value = range ? [25, 75] : Number(props.value ?? 50);
});

let display = $derived(Array.isArray(value) ? `${value[0]}–${value[1]}` : value);
</script>

<div class="flex gap-3 {orientation === 'vertical' ? 'flex-row' : 'w-72 flex-col'}">
	<div
		class="flex text-sm {orientation === 'vertical'
			? 'flex-col items-center gap-1'
			: 'items-baseline justify-between'}"
	>
		<span class="text-muted-foreground">Volume</span>
		<span class="font-mono text-foreground text-xs tabular-nums">{display}</span>
	</div>
	<Slider
		bind:value
		{orientation}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 100)}
		step={Number(props.step ?? 1)}
		disabled={Boolean(props.disabled)}
		label="Volume"
		style={orientation === "vertical" ? "height: 14rem" : undefined}
	/>
</div>
