"use client";

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
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { DEMO_AGENTS, type DemoAgent } from "../data/agent-list";
import { controlProps } from "../data/preview-props";

const finished = (a: DemoAgent): DemoAgent => ({
	...a,
	status: "done",
	steps: a.steps.map((s) => ({ ...s, status: "done" })),
});

export function AgentListDemo({ props }: { props: Record<string, unknown> }) {
	const p = controlProps<ComponentProps<typeof AgentList>>(props);
	const [agents, setAgents] = useState(DEMO_AGENTS);
	const [open, setOpen] = useState<string | null>("invoices");
	const [draft, setDraft] = useState("");
	const timers = useRef<number[]>([]);
	const later = (fn: () => void, ms: number) => {
		timers.current.push(window.setTimeout(fn, ms));
	};
	const patch = (id: string, next: (a: DemoAgent) => Partial<DemoAgent>) =>
		setAgents((list) => list.map((a) => (a.id === id ? { ...a, ...next(a) } : a)));
	const finish = (id: string, ms: number) => later(() => patch(id, finished), ms);

	// The first agent's test loop passes after a while: a scripted story, not component state.
	useEffect(() => {
		const all = timers.current;
		const t = window.setTimeout(
			() => setAgents((list) => list.map((a) => (a.id === "flake" ? finished(a) : a))),
			6000,
		);
		return () => {
			clearTimeout(t);
			all.forEach(clearTimeout);
		};
	}, []);

	function answer(id: string, label: string) {
		patch(id, (a) => ({
			status: "running",
			waiting: false,
			added: a.added + 11,
			steps: [
				...a.steps.filter((s) => s.status === "done"),
				{ label, status: "running" },
			],
		}));
		finish(id, 2600);
	}

	function queue(task: string) {
		const id = `task-${Date.now()}`;
		setAgents((list) => [
			...list,
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
		]);
		later(() => patch(id, () => ({ status: "running" })), 1200);
	}

	const running = agents.filter((a) => a.status === "running").length;

	return (
		<AgentList
			value={open}
			onValueChange={setOpen}
			variant={p.variant}
			className="max-w-xl"
		>
			<AgentListHeader>
				<AgentListTitle>Background agents</AgentListTitle>
				<AgentListCount value={running} />
			</AgentListHeader>
			<AgentListRows>
				{agents.map((a) => (
					<AgentListItem key={a.id} value={a.id} status={a.status}>
						<AgentListTrigger>
							<AgentListStatus />
							<AgentListHeading>
								<AgentListName>{a.task}</AgentListName>
								<AgentListMeta>
									{a.branch} · {a.age}
								</AgentListMeta>
							</AgentListHeading>
							{a.status === "queued" ? null : (
								<AgentListDiff added={a.added} removed={a.removed} />
							)}
						</AgentListTrigger>
						<AgentListContent>
							<AgentListSteps>
								{a.steps.map((s) => (
									<AgentListStep key={s.label} status={s.status}>
										{s.label}
									</AgentListStep>
								))}
							</AgentListSteps>
							{a.question ? (
								<AgentListDecision prompt={a.question} open={a.waiting}>
									<AgentListActions>
										<Button
											size="sm"
											onClick={() => answer(a.id, "Removing legacy_total")}
										>
											Remove it
										</Button>
										<Button
											size="sm"
											variant="outline"
											onClick={() => answer(a.id, "Adding a legacy_total shim")}
										>
											Keep a shim
										</Button>
									</AgentListActions>
								</AgentListDecision>
							) : null}
						</AgentListContent>
					</AgentListItem>
				))}
			</AgentListRows>
			<AgentListFooter>
				<Composer value={draft} onValueChange={setDraft} onSubmit={queue}>
					<ComposerInput placeholder="Queue another task…" />
					<ComposerToolbar>
						<ComposerSubmit />
					</ComposerToolbar>
				</Composer>
			</AgentListFooter>
		</AgentList>
	);
}
