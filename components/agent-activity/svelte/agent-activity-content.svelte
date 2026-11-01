<script lang="ts">
import { Collapsible as CollapsiblePrimitive } from "bits-ui";
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { agentActivityState } from "./context";

let { class: classProp, children }: { class?: string; children: Snippet } = $props();
const activity = agentActivityState("AgentActivityContent");
let list = $state<HTMLElement>();
let height = $state(0);

$effect(() => {
	if (!list) return;
	const node = list;
	const observer = new ResizeObserver(() => {
		height = node.offsetHeight;
	});
	observer.observe(node);
	return () => observer.disconnect();
});

const capped = $derived(height > activity.maxHeight);
const viewport = $derived(Math.min(height, activity.maxHeight));
// While the run works, the newest row stays in view by sliding the list up, not by scrolling.
const offset = $derived(activity.working ? Math.min(0, viewport - height) : 0);
</script>

<!-- forceMount keeps a closed frame for the grid-rows transition to animate from. -->
<CollapsiblePrimitive.Content forceMount data-slot="agent-activity-content" class={activity.styles.panel()}>
	<div class={activity.styles.clip()}>
		<div
			data-capped={capped || undefined}
			data-working={activity.working || undefined}
			data-scroll={(capped && !activity.working) || undefined}
			style:height="{viewport}px"
			class={activity.styles.viewport()}
		>
			<ul bind:this={list} style:translate="0 {offset}px" class={cn(activity.styles.list(), classProp)}>
				{@render children()}
			</ul>
		</div>
	</div>
</CollapsiblePrimitive.Content>
