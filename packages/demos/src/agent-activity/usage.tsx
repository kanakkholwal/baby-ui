"use client";

import {
	AgentActivity,
	AgentActivityContent,
	AgentActivityResult,
	AgentActivitySearch,
	AgentActivityStep,
	AgentActivityTool,
	AgentActivityTrigger,
	formatDuration,
} from "@baby-ui/react";

export function Example({ working, seconds }: { working: boolean; seconds: number }) {
	return (
		<AgentActivity status={working ? "working" : "complete"}>
			<AgentActivityTrigger
				label="Researching…"
				summary={`Worked for ${formatDuration(seconds)}`}
			/>
			<AgentActivityContent>
				<AgentActivityStep>Read the brief</AgentActivityStep>
				<AgentActivitySearch query="pricing page benchmarks" more={4}>
					<AgentActivityResult href="https://example.com" domain="example.com">
						Pricing pages that convert
					</AgentActivityResult>
				</AgentActivitySearch>
				<AgentActivityTool action="edit" target="app/pricing/page.tsx" additions={12} />
			</AgentActivityContent>
		</AgentActivity>
	);
}
