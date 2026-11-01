"use client";

import {
	InlineEdit,
	InlineEditArea,
	InlineEditInput,
	InlineEditMessage,
	InlineEditPreview,
	InlineEditStatus,
} from "@baby-ui/react";

export function Example({
	name,
	rename,
}: {
	name: string;
	rename: (next: string) => Promise<void>;
}) {
	return (
		<InlineEdit label="Project name" value={name} onSave={rename}>
			<InlineEditArea>
				<InlineEditPreview as="h2" />
				<InlineEditInput />
				<InlineEditStatus />
			</InlineEditArea>
			<InlineEditMessage />
		</InlineEdit>
	);
}
