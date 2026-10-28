"use client";

import { Tool } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function ToolDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof Tool>>(props);
	return (
		<div className="flex w-full max-w-sm flex-col gap-2">
			<Tool
				name={p.name || "search_docs"}
				status={p.status ?? "running"}
				input={'{ "query": "dock magnification" }'}
				output={'{ "matches": 3 }'}
				defaultOpen={p.defaultOpen ?? false}
			/>
			<Tool
				name="read_file"
				status="done"
				input={'{ "path": "dock.tsx" }'}
				output="248 lines"
			/>
		</div>
	);
}
