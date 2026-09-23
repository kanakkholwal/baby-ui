"use client";

import { ToolChips } from "@baby-ui/react";

export function Example() {
	return (
		<ToolChips
			steps={[
				{
					label: "Read file",
					chip: "config.ts",
					mono: true,
					detail: [{ text: "212 lines" }],
				},
			]}
			diffs={[{ file: "config.ts", add: 4, del: 1 }]}
		/>
	);
}
