<script lang="ts">
import { cn } from "../lib/cn";
import { type UnderlineHoverTextTone, underlineHoverText } from "./variants";

let {
	text,
	tone = "default",
	durationMs = 500,
	class: classProp,
}: {
	text: string;
	tone?: UnderlineHoverTextTone;
	/** How long the lift and stroke take, in ms. */
	durationMs?: number;
	class?: string;
} = $props();

const classes = $derived(underlineHoverText({ tone }));
</script>

<span data-slot="underline-hover-text" class={cn(classes.root(), classProp)} style="--uht-duration: {durationMs}ms;">
	<span class={classes.label()}>{text}</span>
	<span aria-hidden="true" class={classes.baseline()}></span>
	<span aria-hidden="true" class={classes.stroke()}></span>
</span>
