<script lang="ts">
import type { Snippet } from "svelte";
import { cn } from "../../lib/cn";
import { agentActivityState } from "./context";

let { class: classProp, children }: { class?: string; children: Snippet } = $props();
const activity = agentActivityState("AgentActivityText");
</script>

<!-- A line of the agent's own narration between the actions. -->
<li data-slot="agent-activity-text" class={cn(activity.styles.text(), classProp)}>{@render children()}</li>
