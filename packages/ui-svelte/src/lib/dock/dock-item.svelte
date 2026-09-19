<script lang="ts">
import type { Snippet } from "svelte";
import { prefersReducedMotion, Spring } from "svelte/motion";
import { cn } from "../lib/cn";
import { getDock, SPRING } from "./context";

type Props = {
	children: Snippet;
	class?: string;
	active?: boolean;
	onclick?: () => void;
	"aria-label"?: string;
};

let {
	children,
	class: classProp,
	active = false,
	onclick,
	"aria-label": ariaLabel,
}: Props = $props();

const dock = getDock();
const PILL =
	"pointer-events-none absolute inset-[3px] -z-10 rounded-[inherit] bg-primary/10 transition-[opacity,filter] duration-200 ease-[var(--ease-out)] motion-reduce:transition-none data-[on=false]:opacity-0 data-[on=false]:blur-[3px]";

let el = $state<HTMLDivElement>();
const width = new Spring(dock.size, SPRING[dock.spring]);

const target = $derived.by(() => {
	if (prefersReducedMotion.current || !el) return dock.size;
	const rect = el.getBoundingClientRect();
	const offset = Math.abs(dock.mouseX - rect.x - rect.width / 2);
	if (!Number.isFinite(offset) || offset >= dock.distance) return dock.size;
	const t = 1 - offset / dock.distance;
	return dock.size + (dock.magnification - dock.size) * t;
});

$effect(() => {
	width.stiffness = SPRING[dock.spring].stiffness;
	width.damping = SPRING[dock.spring].damping;
	width.target = target;
});

const shared = $derived(
	cn(
		"relative flex aspect-square shrink-0 items-center justify-center rounded-xl text-foreground",
		classProp,
	),
);
</script>

{#snippet body()}
	<span class={PILL} data-on={active}></span>
	{@render children()}
{/snippet}

<div
	bind:this={el}
	style:width="{width.current}px"
	style:height="{width.current}px"
	class={onclick ? undefined : shared}
>
	{#if onclick}
		<button
			type="button"
			{onclick}
			aria-label={ariaLabel}
			aria-pressed={active}
			class={cn(
				shared,
				"size-full cursor-pointer border-0 bg-transparent p-0",
				"outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
			)}
		>
			{@render body()}
		</button>
	{:else}
		{@render body()}
	{/if}
</div>
