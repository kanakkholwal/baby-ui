<script lang="ts">
import {
	AgentList,
	AgentListActions,
	AgentListContent,
	AgentListCount,
	AgentListDecision,
	AgentListDiff,
	AgentListFooter,
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
	Button,
	Composer,
	ComposerInput,
	ComposerSubmit,
	ComposerToolbar,
} from "@baby-ui/svelte";
import { type ComponentProps, onDestroy } from "svelte";
import { DEMO_AGENTS, type DemoAgent } from "../data/agent-list";
import { controlProps } from "../data/preview-props";

let { props = {} }: { props?: Record<string, unknown> } = $props();
const p = $derived(controlProps<ComponentProps<typeof AgentList>>(props));

let agents = $state(DEMO_AGENTS);
let open = $state<string | null>("invoices");
let draft = $state("");
let timers: ReturnType<typeof setTimeout>[] = [];
onDestroy(() => timers.forEach(clearTimeout));

const later = (fn: () => void, ms: number) => {
	timers.push(setTimeout(fn, ms));
};
const patch = (id: string, next: (a: DemoAgent) => Partial<DemoAgent>) => {
	agents = agents.map((a) => (a.id === id ? { ...a, ...next(a) } : a));
};
const finish = (id: string, ms: number) =>
	later(
		() =>
			patch(id, (a) => ({
				status: "done",
				steps: a.steps.map((s) => ({ ...s, status: "done" })),
			})),
		ms,
	);

// The first agent's test loop passes after a while: a scripted story, not component state.
finish("flake", 6000);

function answer(id: string, label: string) {
	patch(id, (a) => ({
		status: "running",
		waiting: false,
		added: a.added + 11,
		steps: [...a.steps.filter((s) => s.status === "done"), { label, status: "running" }],
	}));
	finish(id, 2600);
}

function queue(task: string) {
	const id = `task-${Date.now()}`;
	agents = [
		...agents,
		{
			id,
			task,
			branch: "agent/new-task",
			age: "now",
			status: "queued",
			added: 0,
			removed: 0,
			steps: [{ label: "Planning the change", status: "pending" }],
		},
	];
	later(() => patch(id, () => ({ status: "running" })), 1200);
}

const running = $derived(agents.filter((a) => a.status === "running").length);
</script>

<AgentList value={open} onValueChange={(next) => (open = next)} variant={p.variant} class="max-w-xl">
	<AgentListHeader>
		<AgentListTitle>Background agents</AgentListTitle>
		<AgentListCount value={running} />
	</AgentListHeader>
	<AgentListRows>
		{#each agents as a (a.id)}
			<AgentListItem value={a.id} status={a.status}>
				<AgentListTrigger>
					<AgentListStatus />
					<AgentListHeading>
						<AgentListName>{a.task}</AgentListName>
						<AgentListMeta>{a.branch} · {a.age}</AgentListMeta>
					</AgentListHeading>
					{#if a.status !== "queued"}<AgentListDiff added={a.added} removed={a.removed} />{/if}
				</AgentListTrigger>
				<AgentListContent>
					<AgentListSteps>
						{#each a.steps as s (s.label)}
							<AgentListStep status={s.status}>{s.label}</AgentListStep>
						{/each}
					</AgentListSteps>
					{#if a.question}
						<AgentListDecision prompt={a.question} open={a.waiting}>
							<AgentListActions>
								<Button size="sm" onclick={() => answer(a.id, "Removing legacy_total")}>Remove it</Button>
								<Button size="sm" variant="outline" onclick={() => answer(a.id, "Adding a legacy_total shim")}>Keep a shim</Button>
							</AgentListActions>
						</AgentListDecision>
					{/if}
				</AgentListContent>
			</AgentListItem>
		{/each}
	</AgentListRows>
	<AgentListFooter>
		<Composer bind:value={draft} onSubmit={queue}>
			<ComposerInput placeholder="Queue another task…" />
			<ComposerToolbar>
				<ComposerSubmit />
			</ComposerToolbar>
		</Composer>
	</AgentListFooter>
</AgentList>
