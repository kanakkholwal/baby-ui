<script lang="ts">
	import { cn } from "../lib/cn.js";

	type Props = {
		value?: number;
		indeterminate?: boolean;
		size?: "sm" | "md";
		class?: string;
		label?: string;
	};

	let { value = 0, indeterminate = false, size = "md", class: classProp, label }: Props = $props();

	const clamped = $derived(Math.min(100, Math.max(0, value)));
	const HEIGHT = { sm: "h-1", md: "h-2" };
</script>

<div
	role="progressbar"
	aria-label={label}
	aria-valuemin={0}
	aria-valuemax={100}
	aria-valuenow={indeterminate ? undefined : clamped}
	class={cn("w-full overflow-hidden rounded-full bg-input", HEIGHT[size], classProp)}
>
	{#if indeterminate}
		<div class="progress-sweep h-full w-2/5 rounded-full bg-primary"></div>
	{:else}
		<div
			style:width="{clamped}%"
			class="h-full rounded-full bg-primary transition-[width] duration-[var(--duration-overlay)] ease-[var(--ease-out)] motion-reduce:transition-none"
		></div>
	{/if}
</div>
