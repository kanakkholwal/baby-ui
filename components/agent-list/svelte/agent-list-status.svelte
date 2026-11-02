<script lang="ts">
import { AGENT_STATUS_ICONS, AGENT_STATUS_TEXT, agentStatus } from "../variants";
import { agentListItem } from "./context";

let { class: classProp }: { class?: string } = $props();
const item = agentListItem("AgentListStatus");
</script>

<!-- The item's status as a marker, with its word for screen readers. -->
<span data-slot="agent-list-status" class={agentStatus({ status: item.status, class: classProp })}>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<circle cx="12" cy="12" r="9" opacity={item.status === "running" ? 0.25 : 1} />
		{#if AGENT_STATUS_ICONS[item.status]}<path d={AGENT_STATUS_ICONS[item.status]} />{/if}
	</svg>
	<span class="sr-only">{AGENT_STATUS_TEXT[item.status]}</span>
</span>
