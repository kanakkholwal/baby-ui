<script lang="ts">
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import { cn } from "../lib/cn.js";

	type Props = {
		value?: string;
		class?: string;
		rows?: number;
		autoGrow?: boolean;
		maxRows?: number;
		invalid?: boolean;
	} & Omit<HTMLTextareaAttributes, "rows" | "value" | "class">;

	let {
		value = $bindable(""),
		class: classProp,
		rows = 3,
		autoGrow = true,
		maxRows = 10,
		invalid = false,
		...rest
	}: Props = $props();

	let el = $state<HTMLTextAreaElement>();

	// Height follows content, never eases: easing lags behind the character just typed.
	$effect(() => {
		void value;
		if (!autoGrow || !el) return;
		const line = Number.parseFloat(getComputedStyle(el).lineHeight) || 20;
		el.style.height = "auto";
		el.style.height = `${Math.min(el.scrollHeight, line * maxRows)}px`;
	});
</script>

<textarea
	{...rest}
	bind:this={el}
	bind:value
	{rows}
	aria-invalid={invalid || undefined}
	class={cn(
		"w-full resize-none rounded-lg border border-input bg-background px-3 py-2 text-foreground text-sm",
		"placeholder:text-muted-foreground",
		"transition-[box-shadow,border-color] duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40",
		"disabled:cursor-not-allowed disabled:opacity-50",
		"aria-[invalid=true]:border-[var(--destructive)]",
		classProp,
	)}
></textarea>
