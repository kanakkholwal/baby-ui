<script lang="ts">
	import type { Snippet } from "svelte";
	import { cn } from "../lib/cn.js";

	type Props = {
		children: Snippet;
		class?: string;
		padding?: "sm" | "md" | "lg";
		interactive?: boolean;
	};

	let { children, class: classProp, padding = "md", interactive = false }: Props = $props();

	const PAD = { sm: "p-3", md: "p-5", lg: "p-7" };
</script>

<div
	class={cn(
		"rounded-2xl border border-border bg-card",
		interactive &&
			"transition-[transform,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:hover:translate-y-0",
		PAD[padding],
		classProp,
	)}
>
	{@render children()}
</div>
