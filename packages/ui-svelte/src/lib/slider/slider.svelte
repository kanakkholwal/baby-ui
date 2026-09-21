<script lang="ts">
import { cn } from "../lib/cn";

let {
	value = $bindable(50),
	min = 0,
	max = 100,
	step = 1,
	disabled = false,
	label,
	class: classProp,
}: {
	value?: number;
	min?: number;
	max?: number;
	step?: number;
	disabled?: boolean;
	label?: string;
	class?: string;
} = $props();

const pct = $derived(
	Math.min(100, Math.max(0, ((value - min) / (max - min || 1)) * 100)),
);

// The native thumb is the handle, so focus, hover and drag states need no mirroring.
const THUMB = [
	"[&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
	"[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow-sm",
	"[&::-webkit-slider-thumb]:transition-[scale,box-shadow] [&::-webkit-slider-thumb]:duration-[var(--duration-press)] [&::-webkit-slider-thumb]:ease-[var(--ease-out)]",
	"[&:not(:disabled):hover::-webkit-slider-thumb]:scale-110 [&:not(:disabled):active::-webkit-slider-thumb]:scale-125",
	"[&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_4px_var(--ring)]",
	"[&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background",
	"[&::-moz-range-thumb]:transition-[scale,box-shadow] [&::-moz-range-thumb]:duration-[var(--duration-press)]",
	"[&:not(:disabled):hover::-moz-range-thumb]:scale-110 [&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_4px_var(--ring)]",
	"motion-reduce:[&::-webkit-slider-thumb]:transition-none motion-reduce:[&::-moz-range-thumb]:transition-none",
].join(" ");
</script>

<div
	data-slot="slider"
	class={cn("relative flex h-5 w-full select-none items-center", disabled && "opacity-50", classProp)}
>
	<div class="h-1 w-full overflow-hidden rounded-full bg-input">
		<div class="h-full rounded-full bg-primary" style:width="{pct}%"></div>
	</div>
	<input
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		aria-label={label}
		bind:value
		class={cn(
			"absolute inset-0 m-0 w-full cursor-pointer appearance-none bg-transparent outline-none disabled:cursor-not-allowed [&::-moz-range-track]:bg-transparent",
			THUMB,
		)}
	/>
</div>
