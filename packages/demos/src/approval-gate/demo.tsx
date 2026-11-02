"use client";

import {
	type ApprovalArgs,
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
	type ApprovalVariant,
} from "@baby-ui/react";
import { useEffect, useState } from "react";
import {
	MIGRATION_REQUEST,
	MIGRATION_TTL_MS,
	REFUND_REQUEST,
	REFUND_TTL_MS,
} from "../data/approval-gate";

type Gate = {
	request: ApprovalRequest;
	status: ApprovalStatus;
	busy: boolean;
	note?: string;
};

function initialGates(): Gate[] {
	const mounted = Date.now();
	return [
		{
			request: {
				...REFUND_REQUEST,
				expiresAt: new Date(mounted + REFUND_TTL_MS).toISOString(),
			},
			status: "pending",
			busy: false,
		},
		{
			request: {
				...MIGRATION_REQUEST,
				expiresAt: new Date(mounted + MIGRATION_TTL_MS).toISOString(),
			},
			status: "pending",
			busy: false,
		},
	];
}

export function ApprovalGateDemo({ props }: { props: Record<string, unknown> }) {
	const [now, setNow] = useState(() => Date.now());
	const [gates, setGates] = useState(initialGates);
	const forced = props.status as ApprovalStatus | undefined;
	const variant = (props.variant as ApprovalVariant) ?? "framed";

	// The demo owns the clock; the component only reads `now`.
	useEffect(() => {
		const timer = setInterval(() => setNow(Date.now()), 1000);
		return () => clearInterval(timer);
	}, []);

	// The status control previews a state directly, on every gate.
	useEffect(() => {
		if (forced)
			setGates((list) => list.map((g) => ({ ...g, status: forced, busy: false })));
	}, [forced]);

	const update = (index: number, patch: Partial<Gate>) =>
		setGates((list) => list.map((g, i) => (i === index ? { ...g, ...patch } : g)));

	function approve(index: number) {
		update(index, { busy: true });
		setTimeout(
			() => update(index, { busy: false, status: "approved", note: "by you, just now" }),
			900,
		);
	}

	function edit(index: number, args: ApprovalArgs) {
		setGates((list) =>
			list.map((g, i) =>
				i === index ? { ...g, request: { ...g.request, args }, status: "pending" } : g,
			),
		);
	}

	return (
		<div className="flex w-full max-w-lg flex-col gap-3">
			{gates.map((gate, i) => (
				<ApprovalGate
					key={gate.request.tool}
					request={gate.request}
					status={gate.status}
					busy={gate.busy}
					note={gate.note}
					now={now}
					variant={variant}
					onEditingChange={(editing) =>
						update(i, { status: editing ? "editing" : "pending" })
					}
					onExpire={() => update(i, { status: "expired", note: "no decision in time" })}
				>
					<ApprovalGateReceipt />
					<ApprovalGateBody>
						<ApprovalGateHeader />
						<ApprovalGateTitle headingLevel={2} />
						<ApprovalGateSummary />
						<ApprovalGateDiff />
						<ApprovalGateArgs />
						<ApprovalGateEditor onEdit={(args) => edit(i, args)} />
						<ApprovalGateActions
							onApprove={() => approve(i)}
							onDeny={(reason) =>
								update(i, {
									status: "denied",
									note: reason ? `"${reason}"` : "by you, just now",
								})
							}
						/>
					</ApprovalGateBody>
				</ApprovalGate>
			))}
		</div>
	);
}
