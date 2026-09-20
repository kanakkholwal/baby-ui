<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

// Slot names and class shape follow shadcn-svelte, so this drops into an existing project.
let {
	children,
	class: classProp,
	interactive = false,
	...rest
}: {
	children?: Snippet;
	class?: string;
	interactive?: boolean;
} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	{...rest}
	data-slot="card"
	class={cn(
		"flex flex-col gap-6 rounded-2xl border border-border bg-card py-6 text-card-foreground",
		interactive &&
			"transition-[transform,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:hover:translate-y-0",
		classProp,
	)}
>
	{@render children?.()}
</div>
