<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../lib/cn";

// Slot names and class shape follow shadcn-svelte, so this drops into an existing project.
let {
	children,
	class: classProp,
	interactive = false,
	variant = "default",
	...rest
}: {
	children?: Snippet;
	class?: string;
	interactive?: boolean;
	variant?: "default" | "framed";
} & HTMLAttributes<HTMLDivElement> = $props();

const LIFT =
	"transition-[transform,scale,translate,border-color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-border-strong motion-reduce:hover:translate-y-0";
</script>

{#if variant === "framed"}
	<!-- Inset frame, same treatment as Dialog: a rim in bg-background around a bg-card body. -->
	<div
		{...rest}
		data-slot="card"
		data-variant="framed"
		class={cn("rounded-2xl border border-border bg-background p-1", interactive && LIFT, classProp)}
	>
		<div class="flex flex-col gap-6 rounded-[11px] bg-card py-6 text-card-foreground">
			{@render children?.()}
		</div>
	</div>
{:else}
	<div
		{...rest}
		data-slot="card"
		class={cn(
			"flex flex-col gap-6 rounded-2xl border border-border bg-card py-6 text-card-foreground",
			interactive && LIFT,
			classProp,
		)}
	>
		{@render children?.()}
	</div>
{/if}
