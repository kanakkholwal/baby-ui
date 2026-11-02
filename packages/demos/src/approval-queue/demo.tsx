"use client";

import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateArgs,
	ApprovalGateBody,
	ApprovalGateDiff,
	ApprovalGateEditor,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalQueue,
	ApprovalQueueContent,
	ApprovalQueueCount,
	ApprovalQueueEmpty,
	ApprovalQueueHeader,
	ApprovalQueueIcon,
	ApprovalQueueItem,
	ApprovalQueueKind,
	ApprovalQueueLabel,
	ApprovalQueueList,
	ApprovalQueueTitle,
	ApprovalQueueTrigger,
	type ApprovalStatus,
	Badge,
	Button,
	RISK_BADGE,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { QUEUED_REQUESTS } from "../data/approval-queue";
import { controlProps } from "../data/preview-props";

type Entry = (typeof QUEUED_REQUESTS)[number] & {
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
	dismissed: boolean;
};

const fresh = (): Entry[] =>
	QUEUED_REQUESTS.map((q) => ({
		...q,
		status: "pending",
		busy: false,
		dismissed: false,
	}));

const RISK_TEXT = { low: "Low", medium: "Medium", high: "High" } as const;

export function ApprovalQueueDemo({ props }: { props: Record<string, unknown> }) {
	const p = controlProps<ComponentProps<typeof ApprovalQueue>>(props);
	const [entries, setEntries] = useState(fresh);
	const [open, setOpen] = useState<string | null>(QUEUED_REQUESTS[0]?.id ?? null);
	const timers = useRef<number[]>([]);
	const latest = useRef(entries);
	latest.current = entries;
	useEffect(() => () => timers.current.forEach(clearTimeout), []);

	const waiting = entries.filter((e) => !e.dismissed && e.status === "pending").length;
	const later = (fn: () => void, ms: number) => {
		timers.current.push(window.setTimeout(fn, ms));
	};
	const patch = (id: string, next: Partial<Entry>) =>
		setEntries((list) => list.map((e) => (e.id === id ? { ...e, ...next } : e)));

	// Show the receipt for a beat, then fold the row and open the next request.
	function settle(id: string, status: ApprovalStatus, note: string) {
		patch(id, { status, note, busy: false });
		later(() => {
			patch(id, { dismissed: true });
			const next = latest.current.find(
				(e) => e.id !== id && !e.dismissed && e.status === "pending",
			);
			setOpen(next?.id ?? null);
		}, 1200);
	}
	const approve = (id: string, note = "by you, just now") => {
		patch(id, { busy: true });
		later(() => settle(id, "approved", note), 700);
	};

	return (
		<div className="flex w-full max-w-xl flex-col items-center gap-3">
			<ApprovalQueue
				value={open}
				onValueChange={setOpen}
				variant={p.variant}
				className="max-w-xl"
			>
				<ApprovalQueueHeader>
					<ApprovalQueueIcon />
					<ApprovalQueueTitle>Waiting for approval</ApprovalQueueTitle>
					<ApprovalQueueCount value={waiting} />
				</ApprovalQueueHeader>
				<ApprovalQueueList>
					{entries.map((e) => (
						<ApprovalQueueItem key={e.id} value={e.id} dismissed={e.dismissed}>
							<ApprovalQueueTrigger>
								<ApprovalQueueKind kind={e.kind} />
								<ApprovalQueueLabel>{e.request.title}</ApprovalQueueLabel>
								<Badge variant={RISK_BADGE[e.request.risk]} size="sm" dot>
									{RISK_TEXT[e.request.risk]}
								</Badge>
							</ApprovalQueueTrigger>
							<ApprovalQueueContent>
								<ApprovalGate
									request={e.request}
									status={e.status}
									busy={e.busy}
									note={e.note}
									now={0}
									variant="plain"
									onEditingChange={(editing) =>
										patch(e.id, { status: editing ? "editing" : "pending" })
									}
								>
									<ApprovalGateReceipt />
									<ApprovalGateBody>
										<ApprovalGateSummary />
										<ApprovalGateDiff />
										<ApprovalGateArgs />
										<ApprovalGateEditor
											onEdit={(args) =>
												patch(e.id, {
													request: { ...e.request, args },
													status: "pending",
												})
											}
										/>
										<ApprovalGateActions
											onApprove={() => approve(e.id)}
											onAlwaysAllow={() =>
												approve(e.id, `${e.request.tool} is always allowed now`)
											}
											onDeny={(reason) =>
												settle(e.id, "denied", reason ? `"${reason}"` : "by you")
											}
										/>
									</ApprovalGateBody>
								</ApprovalGate>
							</ApprovalQueueContent>
						</ApprovalQueueItem>
					))}
					<ApprovalQueueEmpty open={entries.every((e) => e.dismissed)} />
				</ApprovalQueueList>
			</ApprovalQueue>
			<Button
				variant="ghost"
				size="sm"
				onClick={() => {
					timers.current.forEach(clearTimeout);
					setEntries(fresh());
					setOpen(QUEUED_REQUESTS[0]?.id ?? null);
				}}
			>
				Reset queue
			</Button>
		</div>
	);
}
