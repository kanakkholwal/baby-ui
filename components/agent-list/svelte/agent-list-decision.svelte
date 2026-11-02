<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { agentListState } from "./context";

let {
	prompt,
	open = true,
	class: classProp,
	children,
}: { prompt: string; open?: boolean; class?: string; children?: Snippet } = $props();
const ctx = agentListState("AgentListDecision");
</script>

<!-- What the agent is blocked on; folds away once `open` turns false after an answer. -->
<div data-open={open || undefined} inert={!open} class={ctx.styles.fold()}>
	<div class={ctx.styles.clip()}>
		<div data-slot="agent-list-decision" class={cn(ctx.styles.decision(), classProp)}>
			<p class={ctx.styles.prompt()}>{prompt}</p>
			{@render children?.()}
		</div>
	</div>
</div>
