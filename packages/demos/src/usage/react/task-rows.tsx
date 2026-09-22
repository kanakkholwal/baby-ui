"use client";

import { TaskRows } from "@baby-ui/react";

export function Example() {
	return (
		<TaskRows
			rows={[
				{
					key: "verify",
					label: "Verified vendor records",
					amount: "12 suppliers",
					status: "done",
					details: [{ label: "Matched tax and contact IDs", meta: "12/12" }],
				},
			]}
		/>
	);
}
