<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let { class: classProp, ...rest }: HTMLAttributes<HTMLSpanElement> = $props();
const ctx = reasoningState("ReasoningIcon");
const pixels = [0, 1, 2, 3, 4, 5, 6, 7, 8];
</script>

<!-- A 3 x 3 pixel loader: it pulses while thinking and rests when done. -->
<span aria-hidden="true" data-slot="reasoning-icon" data-thinking={ctx.thinking ? "" : undefined} class={cn(ctx.styles.icon(), classProp)} {...rest}>
	{#each pixels as i (i)}
		<span class={ctx.styles.pixel()} style:--i={i}></span>
	{/each}
</span>
