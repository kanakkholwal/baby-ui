<script lang="ts">
import { AgentScreen, type AgentScreenSize } from "@baby-ui/svelte";

let { props = {} }: { props?: Record<string, unknown> } = $props();

const PLACEHOLDER =
	"https://wsrv.nl/?url=95dnc2a95qgwt9ff.public.blob.vercel-storage.com/agent-desktop-v3.png&w=1280&output=webp&q=80";
</script>

<AgentScreen
	agentName={(props.agentName as string) || "Agent"}
	streamSrc={(props.streamSrc as string) || PLACEHOLDER}
	loading={Boolean(props.loading)}
	size={(props.size as AgentScreenSize) ?? "md"}
/>
