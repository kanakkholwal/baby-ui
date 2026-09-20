<script lang="ts">
import { cn } from "../lib/cn";

let {
	value = 0,
	size = 96,
	thickness = 8,
	label,
	tone = "default",
	class: classProp,
}: {
	value?: number;
	size?: number;
	thickness?: number;
	label?: string;
	tone?: "default" | "success" | "warning" | "danger";
	class?: string;
} = $props();

const clamped = $derived(Math.min(100, Math.max(0, value)));
const radius = $derived((size - thickness) / 2);
const circumference = $derived(2 * Math.PI * radius);
// Three quarters of a circle, so the gap reads as a dial rather than a broken ring.
const arc = $derived(circumference * 0.75);
const offset = $derived(arc - (arc * clamped) / 100);

const TONE = {
	default: "text-primary",
	success: "text-[var(--success)]",
	warning: "text-[var(--warning)]",
	danger: "text-[var(--destructive)]",
};
</script>

<div
	role="meter"
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={clamped}
	aria-label={label}
	style:width="{size}px"
	style:height="{size}px"
	class={cn("relative inline-grid place-items-center", classProp)}
>
	<svg viewBox="0 0 {size} {size}" class="-rotate-[225deg] absolute inset-0" aria-hidden="true">
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke="var(--input)"
			stroke-width={thickness}
			stroke-linecap="round"
			stroke-dasharray="{arc} {circumference}"
		/>
		<circle
			cx={size / 2}
			cy={size / 2}
			r={radius}
			fill="none"
			stroke="currentColor"
			stroke-width={thickness}
			stroke-linecap="round"
			stroke-dasharray="{arc} {circumference}"
			stroke-dashoffset={offset}
			class={cn(
				"transition-[stroke-dashoffset] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none",
				TONE[tone],
			)}
		/>
	</svg>
	<span class="font-medium text-foreground text-lg tabular-nums">{Math.round(clamped)}</span>
</div>
