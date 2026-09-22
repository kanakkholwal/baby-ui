<script lang="ts">
import { Slider as SliderPrimitive } from "bits-ui";
import { cn } from "../lib/cn";

let {
	value = $bindable(50),
	min = 0,
	max = 100,
	orientation = "horizontal",
	label,
	class: classProp,
	...rest
}: Omit<
	SliderPrimitive.RootProps,
	"type" | "value" | "min" | "max" | "onValueChange" | "onValueCommit" | "orientation"
> & {
	value?: number | number[];
	min?: number;
	max?: number;
	orientation?: "horizontal" | "vertical";
	label?: string;
} = $props();

const thumbIndices = $derived(
	Array.from({ length: Array.isArray(value) ? value.length : 1 }, (_, i) => i),
);
const rootClass = $derived(
	cn(
		"relative flex items-center",
		orientation === "vertical" ? "h-full" : "w-full",
		classProp,
	),
);
</script>

{#snippet body()}
	<div
		class={cn(
			"relative flex touch-none select-none items-center data-disabled:opacity-50",
			orientation === "vertical" ? "h-full w-5 flex-col" : "h-5 w-full",
		)}
	>
		<span
			data-slot="slider-track"
			class={cn(
				"relative overflow-hidden rounded-full bg-input",
				orientation === "vertical" ? "h-full w-1" : "h-1 w-full",
			)}
		>
			<SliderPrimitive.Range
				data-slot="slider-range"
				class={cn("rounded-full bg-primary", orientation === "vertical" ? "w-full" : "h-full")}
			/>
		</span>
		{#each thumbIndices as index (index)}
			<SliderPrimitive.Thumb
				{index}
				aria-label={label}
				data-slot="slider-thumb"
				class="block size-4 shrink-0 rounded-full border-2 border-primary bg-background shadow-sm outline-none transition-[scale,box-shadow] duration-[var(--duration-press)] ease-[var(--ease-out)] hover:scale-110 active:scale-125 focus-visible:shadow-[0_0_0_4px_var(--ring)] motion-reduce:transition-none"
			/>
		{/each}
	</div>
{/snippet}

<!-- bits-ui's type/value form a discriminated union that can't narrow from a runtime variable. -->
{#if Array.isArray(value)}
	<SliderPrimitive.Root
		bind:value={value as number[]}
		type="multiple"
		{min}
		{max}
		{orientation}
		data-slot="slider"
		class={rootClass}
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
		data-slot="slider"
		class={rootClass}
		{...rest}
	>
		{@render body()}
	</SliderPrimitive.Root>
{/if}
