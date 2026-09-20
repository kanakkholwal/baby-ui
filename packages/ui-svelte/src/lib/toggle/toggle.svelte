<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";

let {
	children,
	pressed = $bindable(false),
	disabled = false,
	size = "md",
	label,
	class: classProp,
}: {
	children?: Snippet;
	pressed?: boolean;
	disabled?: boolean;
	size?: "sm" | "md";
	label?: string;
	class?: string;
} = $props();

const SIZE = { sm: "h-7 min-w-7 px-2 text-xs", md: "h-9 min-w-9 px-2.5 text-sm" };
</script>

<button
	type="button"
	aria-pressed={pressed}
	aria-label={label}
	{disabled}
	onclick={() => (pressed = !pressed)}
	class={cn(
		"inline-flex items-center justify-center gap-1.5 rounded-lg border border-transparent font-medium transition-[background-color,color,transform] duration-[var(--duration-press)] ease-[var(--ease-out)]",
		"text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground",
		"aria-pressed:border-border aria-pressed:bg-foreground/[0.08] aria-pressed:text-foreground",
		"outline-none focus-visible:ring-2 focus-visible:ring-ring",
		"active:scale-[var(--press-scale)] disabled:pointer-events-none disabled:opacity-50",
		SIZE[size],
		classProp,
	)}
>
	{@render children?.()}
</button>
