<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import { cn } from "../../lib/cn";
import { reasoningState } from "./context";

let {
	class: classProp,
	...rest
}: Omit<HTMLAttributes<HTMLSpanElement>, "children"> = $props();
const ctx = reasoningState("ReasoningPreview");
const preview = $derived(ctx.thinking && !ctx.open ? ctx.active : null);
</script>

<!-- The label of the step in progress, while the panel is closed and the model is thinking. -->
{#if preview}
	{#key preview.id}
		<span
			data-slot="reasoning-preview"
			class={cn(ctx.styles.preview(), "text-transition-unit", classProp)}
			style="--tt-duration: 220ms; --tt-from-opacity: 0; --tt-from-y: 8px; --tt-from-blur: 3px;"
			{...rest}>{preview.label}</span
		>
	{/key}
{/if}
