"use client";

import {
	AgentList,
	AgentListContent,
	AgentListCount,
	AgentListDiff,
	AgentListHeader,
	AgentListHeading,
	AgentListItem,
	AgentListMeta,
	AgentListName,
	AgentListRows,
	AgentListStatus,
	AgentListStep,
	AgentListSteps,
	AgentListTitle,
	AgentListTrigger,
	type AgentStatus,
} from "@baby-ui/react";
import { useState } from "react";

type Agent = {
	id: string;
	task: string;
	branch: string;
	status: AgentStatus;
	added: number;
	removed: number;
	steps: string[];
};

export function Example({ agents }: { agents: Agent[] }) {
	const [open, setOpen] = useState<string | null>(null);
	return (
		<AgentList value={open} onValueChange={setOpen}>
			<AgentListHeader>
				<AgentListTitle>Background agents</AgentListTitle>
				<AgentListCount value={agents.filter((a) => a.status === "running").length} />
			</AgentListHeader>
			<AgentListRows>
				{agents.map((a) => (
					<AgentListItem key={a.id} value={a.id} status={a.status}>
						<AgentListTrigger>
							<AgentListStatus />
							<AgentListHeading>
								<AgentListName>{a.task}</AgentListName>
								<AgentListMeta>{a.branch}</AgentListMeta>
							</AgentListHeading>
							<AgentListDiff added={a.added} removed={a.removed} />
						</AgentListTrigger>
						<AgentListContent>
							<AgentListSteps>
								{a.steps.map((step) => (
									<AgentListStep key={step}>{step}</AgentListStep>
								))}
							</AgentListSteps>
						</AgentListContent>
					</AgentListItem>
				))}
			</AgentListRows>
		</AgentList>
	);
}
