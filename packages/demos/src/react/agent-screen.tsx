"use client";

import { AgentScreen } from "@baby-ui/react";

type Props = Record<string, unknown>;

const PLACEHOLDER =
	"https://95dnc2a95qgwt9ff.public.blob.vercel-storage.com/agent-desktop-v3.png";

export function AgentScreenDemo({ props }: { props: Props }) {
	return (
		<AgentScreen
			agentName={(props.agentName as string) || "Agent"}
			streamSrc={PLACEHOLDER}
			loading={Boolean(props.loading)}
		/>
	);
}
