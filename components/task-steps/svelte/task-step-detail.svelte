<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { taskStepsState } from "./context";

let {
	meta,
	class: classProp,
	children,
}: {
	/** A right-aligned figure, e.g. "12/12". */
	meta?: string;
	class?: string;
	children: Snippet;
} = $props();
const ctx = taskStepsState("TaskStepDetail");
</script>

<li data-slot="task-step-detail" class={cn(ctx.styles.detail(), classProp)}>
	<span class="min-w-0 truncate">{@render children()}</span>
	{#if meta}<span class={ctx.styles.detailMeta()}>{meta}</span>{/if}
</li>
