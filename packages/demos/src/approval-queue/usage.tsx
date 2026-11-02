"use client";

import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateBody,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalQueue,
	ApprovalQueueContent,
	ApprovalQueueCount,
	ApprovalQueueHeader,
	ApprovalQueueItem,
	ApprovalQueueKind,
	ApprovalQueueLabel,
	ApprovalQueueList,
	ApprovalQueueTitle,
	ApprovalQueueTrigger,
	type ApprovalRequest,
	type ApprovalStatus,
} from "@baby-ui/react";
import { useState } from "react";

type Item = {
	id: string;
	request: ApprovalRequest;
	status: ApprovalStatus;
	dismissed: boolean;
};

export function Example({ items }: { items: Item[] }) {
	const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);
	const waiting = items.filter((item) => item.status === "pending").length;
	return (
		<ApprovalQueue value={open} onValueChange={setOpen}>
			<ApprovalQueueHeader>
				<ApprovalQueueTitle>Waiting for approval</ApprovalQueueTitle>
				<ApprovalQueueCount value={waiting} />
			</ApprovalQueueHeader>
			<ApprovalQueueList>
				{items.map((item) => (
					<ApprovalQueueItem key={item.id} value={item.id} dismissed={item.dismissed}>
						<ApprovalQueueTrigger>
							<ApprovalQueueKind kind="terminal" />
							<ApprovalQueueLabel>{item.request.title}</ApprovalQueueLabel>
						</ApprovalQueueTrigger>
						<ApprovalQueueContent>
							<ApprovalGate
								request={item.request}
								status={item.status}
								now={Date.now()}
								variant="plain"
							>
								<ApprovalGateReceipt />
								<ApprovalGateBody>
									<ApprovalGateSummary />
									<ApprovalGateActions />
								</ApprovalGateBody>
							</ApprovalGate>
						</ApprovalQueueContent>
					</ApprovalQueueItem>
				))}
			</ApprovalQueueList>
		</ApprovalQueue>
	);
}
