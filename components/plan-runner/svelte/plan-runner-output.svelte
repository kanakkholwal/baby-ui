<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { planRunnerState, planStepState } from "./context";

let {
	open = true,
	class: classProp,
	children,
}: { open?: boolean; class?: string; children?: Snippet } = $props();
const ctx = planRunnerState("PlanRunnerOutput");
const step = planStepState();
let node = $state<HTMLPreElement | null>(null);

$effect(() => {
	const el = node;
	const running = step?.status === "running";
	if (!el) return;
	const follow = new MutationObserver(() => {
		if (running) el.scrollTop = el.scrollHeight;
	});
	follow.observe(el, { childList: true, characterData: true, subtree: true });
	return () => follow.disconnect();
});
</script>

<!-- Streaming output; follows its end while the step runs and folds when `open` is false. -->
<div data-open={open || undefined} inert={!open} class={ctx.styles.fold()}>
	<div class={ctx.styles.clip()}>
		<pre bind:this={node} class={cn(ctx.styles.output(), classProp)}>{@render children?.()}</pre>
	</div>
</div>
