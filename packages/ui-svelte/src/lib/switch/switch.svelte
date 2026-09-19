<script lang="ts">
	import { cn } from "../lib/cn.js";

	type Props = {
		checked?: boolean;
		disabled?: boolean;
		size?: "sm" | "md";
		label?: string;
		class?: string;
	};

	let {
		checked = $bindable(false),
		disabled = false,
		size = "md",
		label,
		class: classProp,
	}: Props = $props();

	const TRACK = { sm: "h-4 w-7", md: "h-5 w-9" };
	const THUMB = { sm: "size-3", md: "size-4" };
	const TRAVEL = { sm: "0.75rem", md: "1rem" };
</script>

<button
	type="button"
	role="switch"
	aria-checked={checked}
	aria-label={label}
	{disabled}
	onclick={() => (checked = !checked)}
	class={cn(
		"relative inline-flex shrink-0 items-center rounded-full border border-transparent bg-input transition-colors duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
		"aria-checked:bg-primary disabled:cursor-not-allowed disabled:opacity-50",
		TRACK[size],
		classProp,
	)}
>
	<span
		aria-hidden="true"
		style:transform={checked ? `translateX(${TRAVEL[size]})` : "translateX(2px)"}
		class={cn(
			"rounded-full bg-background shadow-sm transition-transform duration-[var(--duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none",
			THUMB[size],
		)}
	></span>
</button>
