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

const pct = $derived(((value - min) / (max - min || 1)) * 100);
</script>

<div class={cn("slider relative flex h-5 w-full items-center", disabled && "opacity-50", classProp)}>
	<div class="h-1 w-full rounded-full bg-input">
		<div class="h-full rounded-full bg-primary" style:width="{pct}%"></div>
	</div>
	<span
		aria-hidden="true"
		class="slider-thumb pointer-events-none absolute size-4 rounded-full border border-border-strong bg-background shadow-sm"
		style:left="calc({pct}% - 0.5rem)"
	></span>
	<input
		type="range"
		{min}
		{max}
		{step}
		{disabled}
		aria-label={label}
		bind:value
		class="absolute inset-0 w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
	/>
</div>
