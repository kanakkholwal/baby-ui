<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { toolContext } from "./context";

let {
	label = "Output",
	maxHeight = 220,
	class: classProp,
	children,
}: {
	label?: string;
	/** In px; longer output scrolls. */
	maxHeight?: number;
	class?: string;
	/** The result or the streaming log. */
	children: Snippet;
} = $props();
const ctx = toolContext("ToolOutput");
let log = $state<HTMLElement>();

// While the call runs, new output keeps the end in view.
$effect(() => {
	if (!log) return;
	const node = log;
	const follow = () => {
		if (ctx.status === "running") node.scrollTop = node.scrollHeight;
	};
	const observer = new MutationObserver(follow);
	observer.observe(node, { childList: true, subtree: true, characterData: true });
	return () => observer.disconnect();
});
</script>

<div data-slot="tool-output" data-status={ctx.status} class={cn(ctx.styles.section(), classProp)}>
	<p class={ctx.styles.label()}>{label}</p>
	<pre bind:this={log} role="log" aria-live="polite" style:max-height="{maxHeight}px" class={cn(ctx.styles.code(), "text-foreground data-[status=error]:text-destructive-strong")} data-status={ctx.status}><code>{@render children()}</code></pre>
</div>
