<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let {
	thinkingLabel = "Thinking",
	class: classProp,
	children,
	...rest
}: HTMLAttributes<HTMLSpanElement> & {
	/** Shown while thinking; the children show once done, for example "Thought for 4s". */
	thinkingLabel?: string;
	children?: Snippet;
} = $props();
const ctx = reasoningState("ReasoningTitle");
</script>

<span data-slot="reasoning-title" class={cn(ctx.thinking ? ctx.styles.titleThinking() : ctx.styles.title(), classProp)} {...rest}>
	{#if ctx.thinking}{thinkingLabel}{:else}{@render children?.()}{/if}
</span>
