"use client";

import { AgentScreen, type AgentScreenSize } from "@baby-ui/react";

type Props = Record<string, unknown>;

const PLACEHOLDER =
	"https://wsrv.nl/?url=95dnc2a95qgwt9ff.public.blob.vercel-storage.com/agent-desktop-v3.png&w=1280&output=webp&q=80";

export function AgentScreenDemo({ props }: { props: Props }) {
	return (
		<AgentScreen
			agentName={(props.agentName as string) || "Agent"}
			streamSrc={(props.streamSrc as string) || PLACEHOLDER}
			loading={Boolean(props.loading)}
			size={(props.size as AgentScreenSize) ?? "md"}
		/>
	);
}
