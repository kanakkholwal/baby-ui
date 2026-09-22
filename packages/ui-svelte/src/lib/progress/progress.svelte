<script lang="ts">
import { Progress as ProgressPrimitive } from "bits-ui";
import { cn } from "../lib/cn";
import { type ProgressSize, progressTrack } from "./variants";

type Props = {
	value?: number;
	indeterminate?: boolean;
	size?: ProgressSize;
	class?: string;
	label?: string;
};

let {
	value = 0,
	indeterminate = false,
	size = "md",
	class: classProp,
	label,
}: Props = $props();

const clamped = $derived(Math.min(100, Math.max(0, value)));
</script>

<ProgressPrimitive.Root
	value={indeterminate ? null : clamped}
	aria-label={label}
	data-slot="progress"
	class={cn(progressTrack({ size }), classProp)}
>
	{#if indeterminate}
		<div class="progress-sweep h-full w-2/5 rounded-full bg-primary"></div>
	{:else}
		<div
			style:width="{clamped}%"
			class="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none"
		></div>
	{/if}
</ProgressPrimitive.Root>
