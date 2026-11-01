<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { toolContext } from "./context";

let {
	label = "Input",
	class: classProp,
	children,
}: {
	label?: string;
	class?: string;
	/** The arguments, usually JSON. */
	children: Snippet;
} = $props();
const ctx = toolContext("ToolInput");
</script>

<div data-slot="tool-input" class={cn(ctx.styles.section(), classProp)}>
	<p class={ctx.styles.label()}>{label}</p>
	<pre class={cn(ctx.styles.code(), "text-muted-foreground")}><code>{@render children()}</code></pre>
</div>
