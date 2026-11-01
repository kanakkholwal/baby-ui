"use client";

import {
	Tool,
	ToolActions,
	ToolContent,
	ToolCopy,
	ToolInput,
	ToolOutput,
	ToolRetry,
	type ToolState,
	ToolTrigger,
} from "@baby-ui/react";

export function Example({
	status,
	input,
	output,
	retry,
}: {
	status: ToolState;
	input: string;
	output: string;
	retry: () => void;
}) {
	return (
		<Tool status={status}>
			<ToolTrigger name="search_docs" title="Searching the docs" kind="search" />
			<ToolContent>
				<ToolInput>{input}</ToolInput>
				<ToolOutput>{output}</ToolOutput>
				<ToolActions>
					<ToolCopy text={output} />
					<ToolRetry onClick={retry} />
				</ToolActions>
			</ToolContent>
		</Tool>
	);
}
