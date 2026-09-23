<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../lib/cn";
import { type DoubleUnderlineTrigger, doubleUnderline } from "./variants";

let {
	children,
	as = "span",
	trigger = "hover",
	durationMs = 500,
	class: classProp,
}: {
	children: Snippet;
	as?: string;
	trigger?: DoubleUnderlineTrigger;
	/** How long the stroke reveal and letter-spacing shift take, in ms. */
	durationMs?: number;
	class?: string;
} = $props();

const classes = $derived(doubleUnderline({ trigger }));
</script>

<svelte:element
	this={as}
	data-slot="double-underline"
	class={cn(classes.root(), classProp)}
	style="--du-duration: {durationMs}ms;"
>
	{@render children()}
	<span aria-hidden="true" class={classes.bottom()}></span>
	<span aria-hidden="true" class={classes.top()}></span>
</svelte:element>
