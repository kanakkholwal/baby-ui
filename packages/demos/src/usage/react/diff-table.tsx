"use client";

import { DiffTable } from "@baby-ui/react";

export function Example() {
	return (
		<DiffTable
			rows={[
				{
					key: "docs",
					label: "docs/setup.md",
					category: "Docs",
					detail: "removed",
					change: "removed",
				},
				{
					key: "readme",
					label: "README.md",
					category: "Docs",
					detail: "added",
					change: "added",
				},
			]}
		/>
	);
}
