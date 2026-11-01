"use client";

import {
	InlineEdit,
	InlineEditArea,
	InlineEditInput,
	InlineEditMessage,
	InlineEditPreview,
	InlineEditStatus,
} from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

// A name with "fail" in it rejects, so the rollback and Edit again can be tried.
const request = (next: string) =>
	new Promise<void>((resolve, reject) =>
		setTimeout(
			() => (/fail/i.test(next) ? reject(new Error("Rejected")) : resolve()),
			700,
		),
	);

export function InlineEditDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof InlineEdit>>(props);
	const [name, setName] = useState("Atlas redesign");
	const [about, setAbout] = useState(
		"Checkout and account pages, rebuilt on the new components.",
	);
	return (
		<div className="flex w-full max-w-md flex-col gap-2">
			<InlineEdit
				label="Project name"
				value={name}
				placeholder="Untitled project"
				variant={p.variant}
				size={p.size}
				multiline={p.multiline}
				validate={(next) => (next ? null : "A project needs a name.")}
				onSave={async (next) => {
					await request(next);
					setName(next);
				}}
			>
				<InlineEditArea>
					<InlineEditPreview as="h3" />
					<InlineEditInput />
					<InlineEditStatus />
				</InlineEditArea>
				<InlineEditMessage />
			</InlineEdit>
			<InlineEdit
				label="Description"
				value={about}
				placeholder="Add a description"
				variant="body"
				multiline
				onSave={async (next) => {
					await request(next);
					setAbout(next);
				}}
			>
				<InlineEditArea>
					<InlineEditPreview as="p" />
					<InlineEditInput />
					<InlineEditStatus />
				</InlineEditArea>
				<InlineEditMessage />
			</InlineEdit>
		</div>
	);
}
