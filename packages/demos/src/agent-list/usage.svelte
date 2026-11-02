<script lang="ts">
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
} from "@baby-ui/svelte";

type Agent = {
	id: string;
	task: string;
	branch: string;
	status: AgentStatus;
	added: number;
	removed: number;
	steps: string[];
};

let { agents }: { agents: Agent[] } = $props();
let open = $state<string | null>(null);
</script>

<AgentList value={open} onValueChange={(next) => (open = next)}>
	<AgentListHeader>
		<AgentListTitle>Background agents</AgentListTitle>
		<AgentListCount value={agents.filter((a) => a.status === "running").length} />
	</AgentListHeader>
	<AgentListRows>
		{#each agents as a (a.id)}
			<AgentListItem value={a.id} status={a.status}>
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
						{#each a.steps as step (step)}
							<AgentListStep>{step}</AgentListStep>
						{/each}
					</AgentListSteps>
				</AgentListContent>
			</AgentListItem>
		{/each}
	</AgentListRows>
</AgentList>
