<script lang="ts">
import { AgentScreen } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const PLACEHOLDER =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/agent-desktop-v3.png";
</script>

<AgentScreen
	agentName={(props.agentName as string) || "Agent"}
	streamSrc={PLACEHOLDER}
	loading={Boolean(props.loading)}
/>
