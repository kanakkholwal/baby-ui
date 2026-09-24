<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { type SliderMark, type SliderSize, slider, sliderPercent } from "./variants";

let {
	value = $bindable(50),
	min = 0,
	max = 100,
	orientation = "horizontal",
	label,
	size = "md",
	showValue = false,
	formatValue = (v: number) => String(v),
	marks = [],
	onValueChange,
	onValueCommit,
	disabled,
	class: classProp,
	...rest
}: Omit<
	SliderPrimitive.RootProps,
	"type" | "value" | "min" | "max" | "onValueChange" | "onValueCommit" | "orientation"
> & {
	/** Bindable value; an array renders one thumb per entry. */
	value?: number | number[];
	min?: number;
	max?: number;
	orientation?: "horizontal" | "vertical";
	/** Accessible name; also the header title when `showValue` is on. */
	label?: string;
	size?: SliderSize;
	/** Header with the label and the live value. */
	showValue?: boolean;
	formatValue?: (value: number) => string;
	/** Ticks under the track; clicking one jumps there. */
	marks?: SliderMark[];
	onValueChange?: (value: number | number[]) => void;
	/** Fires once a drag or key press settles. */
	onValueCommit?: (value: number | number[]) => void;
} = $props();

const values = $derived(Array.isArray(value) ? value : [value]);
const styles = $derived(slider({ size }));

function jumpTo(target: number) {
	if (!Array.isArray(value)) {
		value = target;
		onValueChange?.(target);
		return;
	}
	const list = value;
	const nearest = list.reduce(
		(best, v, i) =>
			Math.abs(v - target) < Math.abs((list[best] ?? 0) - target) ? i : best,
		0,
	);
	value = list.map((v, i) => (i === nearest ? target : v));
	onValueChange?.(value);
}
</script>

{#snippet body()}
	{#if showValue}
		<div class={styles.header()}>
			<span class={styles.title()}>{label}</span>
			<span class={styles.value()}>{values.map(formatValue).join(" - ")}</span>
		</div>
	{/if}
	<div data-orientation={orientation} class={styles.control()}>
		<span data-slot="slider-track" data-orientation={orientation} class={styles.track()}>
			<SliderPrimitive.Range data-slot="slider-range" class={styles.range()} />
		</span>
		{#each values as _, index (index)}
			<SliderPrimitive.Thumb {index} aria-label={label} data-slot="slider-thumb" class={styles.thumb()} />
		{/each}
	</div>
	{#if marks.length > 0 && orientation === "horizontal"}
		<div class={styles.marks()}>
			{#each marks as mark (mark.value)}
				<span class={styles.mark()} style:left="{sliderPercent(mark.value, min, max)}%">
					<span aria-hidden="true" class={styles.markDot()}></span>
					{#if mark.label}
						<button
							type="button"
							{disabled}
							class={styles.markButton()}
							onclick={() => jumpTo(mark.value)}>{mark.label}</button
						>
					{/if}
				</span>
			{/each}
		</div>
	{/if}
{/snippet}

<!-- bits-ui's type/value form a discriminated union that can't narrow from a runtime variable. -->
{#if Array.isArray(value)}
	<SliderPrimitive.Root
		bind:value={value as number[]}
		type="multiple"
		{min}
		{max}
		{orientation}
		{disabled}
		onValueChange={(next) => onValueChange?.(next)}
		onValueCommit={(next) => onValueCommit?.(next)}
		data-slot="slider"
		class={cn(styles.root(), classProp)}
		{...rest}
	>
		{@render body()}
	</SliderPrimitive.Root>
{:else}
	<SliderPrimitive.Root
		bind:value={value as number}
		type="single"
		{min}
		{max}
		{orientation}
		{disabled}
		onValueChange={(next) => onValueChange?.(next)}
		onValueCommit={(next) => onValueCommit?.(next)}
		data-slot="slider"
		class={cn(styles.root(), classProp)}
		{...rest}
	>
		{@render body()}
	</SliderPrimitive.Root>
{/if}
