<script lang="ts">
import { Slider, type SliderSize, type SliderVariant } from "@baby-ui/svelte";
import { SLIDER_MARKS, SLIDER_PRESETS } from "../data/slider";

let { props = {} }: { props?: Record<string, unknown> } = $props();

let variant = $derived((props.variant as SliderVariant) ?? "default");
let preset = $derived(SLIDER_PRESETS[variant] ?? SLIDER_PRESETS.default);
let orientation = $derived(
	variant === "default"
		? ((props.orientation as "horizontal" | "vertical") ?? "horizontal")
		: "horizontal",
);
let range = $derived(Boolean(props.range));
let value = $state<number | number[]>(50);

$effect(() => {
	value = range ? [25, 75] : Number(props.value ?? 50);
});
</script>

<div
	class={orientation === "vertical"
		? "flex h-56"
		: variant === "default"
			? "w-72"
			: "w-full max-w-sm"}
>
	<Slider
		bind:value
		{variant}
		{orientation}
		min={Number(props.min ?? 0)}
		max={Number(props.max ?? 100)}
		step={Number(props.step ?? 1)}
		disabled={Boolean(props.disabled)}
		label={preset?.label}
		formatValue={preset?.format}
		size={(props.size as SliderSize) ?? "md"}
		showValue={props.showValue === true}
		marks={variant === "default" ? SLIDER_MARKS : undefined}
	/>
</div>
