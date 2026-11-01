<script lang="ts">
import Button from "../../button/svelte/button.svelte";
import { cn } from "../../lib/cn";
import { TOOL_ICONS } from "../variants";
import { toolContext } from "./context";

let {
	onclick,
	label = "Run again",
	class: classProp,
}: {
	/** Runs the call again; the button shows only once it has finished or failed. */
	onclick: () => void;
	label?: string;
	class?: string;
} = $props();
const ctx = toolContext("ToolRetry");
</script>

{#if ctx.status === "done" || ctx.status === "error"}
	<Button data-slot="tool-retry" variant="ghost" size="icon-xs" aria-label={label} class={cn(ctx.styles.action(), classProp)} {onclick}>
		<svg viewBox="0 0 24 24" aria-hidden="true" class={ctx.styles.statusIcon()}><path d={TOOL_ICONS.retry} /></svg>
	</Button>
{/if}
