import {
	ApprovalGate,
	ApprovalGateActions,
	ApprovalGateArgs,
	ApprovalGateBody,
	ApprovalGateDiff,
	ApprovalGateEditor,
	ApprovalGateHeader,
	ApprovalGateReceipt,
	ApprovalGateSummary,
	ApprovalGateTitle,
	type ApprovalRequest,
	type ApprovalStatus,
} from "@baby-ui/react";
import { useEffect, useState } from "react";

const request: ApprovalRequest = {
	tool: "payments.issue_refund",
	title: "Refund a duplicate charge",
	summary: "Refund $49.00 for charge ch_3Pq8, billed twice on May 3.",
	risk: "medium",
	args: { charge: "ch_3Pq8LmA2", amount: 4900, reason: "duplicate" },
	expiresAt: new Date(Date.now() + 5 * 60_000).toISOString(),
};

export function Example() {
	const [status, setStatus] = useState<ApprovalStatus>("pending");
	const [now, setNow] = useState(() => Date.now());

	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	return (
		<ApprovalGate
			request={request}
			status={status}
			now={now}
			onEditingChange={(editing) => setStatus(editing ? "editing" : "pending")}
			onExpire={() => setStatus("expired")}
		>
			<ApprovalGateReceipt />
			<ApprovalGateBody>
				<ApprovalGateHeader />
				<ApprovalGateTitle />
				<ApprovalGateSummary />
				<ApprovalGateDiff />
				<ApprovalGateArgs />
				<ApprovalGateEditor />
				<ApprovalGateActions
					onApprove={() => setStatus("approved")}
					onDeny={() => setStatus("denied")}
				/>
			</ApprovalGateBody>
		</ApprovalGate>
	);
}
