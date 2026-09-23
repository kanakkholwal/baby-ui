<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { type MetisTextDirection, metisText } from "./variants";

let {
	children,
	as = "span",
	direction = "left",
	durationMs = 300,
	class: classProp,
}: {
	children: Snippet;
	as?: string;
	direction?: MetisTextDirection;
	/** How long the underline grows for, in ms. */
	durationMs?: number;
	class?: string;
} = $props();

const classes = $derived(metisText({ direction }));
</script>

<svelte:element
	this={as}
	tabindex={0}
	data-slot="metis-text"
	class={cn(classes.root(), classProp)}
	style="--mtx-duration: {durationMs}ms;"
>
	{@render children()}
	<span aria-hidden="true" class={classes.underline()}></span>
</svelte:element>
