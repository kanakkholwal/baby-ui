"use client";

import { Command } from "@baby-ui/react";
import { useState } from "react";

const items = [
	{ id: "new", label: "New project", group: "Actions", shortcut: "N" },
	{ id: "deploy", label: "Deploy", group: "Actions", shortcut: "D" },
	{ id: "docs", label: "Documentation", group: "Go to" },
];

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Open palette
			</button>
			<Command
				open={open}
				onOpenChange={setOpen}
				items={items}
				onSelect={(id) => console.log(id)}
			/>
		</>
	);
}
