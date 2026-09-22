"use client";

import { type TaskRow, TaskRows, type TaskRowsVariant } from "@baby-ui/react";
import { useEffect, useState } from "react";

type Props = Record<string, unknown>;

const INITIAL_ROWS: TaskRow[] = [
	{
		key: "verify",
		label: "Verified vendor records",
		amount: "12 suppliers",
		status: "done",
		details: [
			{ label: "Matched tax and contact IDs", meta: "12/12" },
			{ label: "Flagged stale records", meta: "0" },
		],
	},
	{
		key: "index",
		label: "Build reorder task list",
		amount: "7 SKUs",
		status: "running",
		step: 2,
		details: [
			{ label: "Reading POS export", meta: "3 files" },
			{ label: "Scoring stockout risk", meta: "68%" },
		],
	},
	{
		key: "draft",
		label: "Draft supplier emails",
		amount: "2 messages",
		status: "pending",
		step: 3,
		details: [
			{ label: "Cone supplier follow-up", meta: "draft" },
			{ label: "Pistachio reorder note", meta: "draft" },
		],
	},
];

export function TaskRowsDemo({ props }: { props: Props }) {
	const [rows, setRows] = useState(INITIAL_ROWS);

	useEffect(() => {
		const id = setTimeout(() => {
			setRows((current) =>
				current.map((r) => (r.key === "draft" ? { ...r, status: "failed" } : r)),
			);
		}, 2600);
		return () => clearTimeout(id);
	}, []);

	function retry(key: string) {
		setRows((current) =>
			current.map((r) => (r.key === key ? { ...r, status: "done" } : r)),
		);
	}

	return (
		<TaskRows
			variant={(props.variant as TaskRowsVariant) ?? "capsules"}
			rows={rows}
			onRetry={retry}
		/>
	);
}
