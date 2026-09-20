<script lang="ts">
import { Slider } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let value = $state(50);

$effect(() => {
	value = Number(props.value ?? 50);
});
</script>

<div class="flex w-72 flex-col gap-2">
	<div class="flex items-baseline justify-between text-sm">
		<span class="text-muted-foreground">Volume</span>
		<span class="font-mono text-foreground text-xs tabular-nums">{value}</span>
	</div>
	<Slider
		bind:value
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 100)}
		step={Number(props.step ?? 1)}
		disabled={Boolean(props.disabled)}
		label="Volume"
	/>
</div>
