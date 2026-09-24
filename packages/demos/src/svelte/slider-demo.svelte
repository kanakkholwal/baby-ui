<script lang="ts">
import { Slider, type SliderSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let orientation = $derived(
	(props.orientation as "horizontal" | "vertical") ?? "horizontal",
);
let range = $derived(Boolean(props.range));
let value = $state<number | number[]>(50);

$effect(() => {
	value = range ? [25, 75] : Number(props.value ?? 50);
});

const marks = [
	{ value: 0, label: "0" },
	{ value: 25, label: "25" },
	{ value: 50, label: "50" },
	{ value: 75, label: "75" },
	{ value: 100, label: "100" },
];
</script>

<div class={orientation === "vertical" ? "flex h-56" : "w-72"}>
	<Slider
		bind:value
		{orientation}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 100)}
		step={Number(props.step ?? 1)}
		disabled={Boolean(props.disabled)}
		label="Volume"
		size={(props.size as SliderSize) ?? "md"}
		showValue={props.showValue === true}
		{marks}
	/>
</div>
