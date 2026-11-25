<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let {
	format = (seconds: number) => `${seconds}s`,
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLSpanElement>, "children"> & {
	format?: (seconds: number) => string;
} = $props();
const ctx = reasoningState("ReasoningDuration");
</script>

<!-- The seconds so far, in the mono face; it only shows while thinking. -->
{#if ctx.thinking && ctx.duration > 0}
	<span data-slot="reasoning-duration" class={cn(ctx.styles.duration(), classProp)} {...rest}>{format(ctx.duration)}</span>
{/if}
