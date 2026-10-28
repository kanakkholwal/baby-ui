"use client";

import { TableOfContents } from "@baby-ui/react";

const items = [
	{ id: "getting-started", label: "Getting started", depth: 2 as const },
	{ id: "install", label: "Install the CLI", depth: 3 as const },
	{ id: "theming", label: "Theming", depth: 2 as const },
	{ id: "tokens", label: "Colour tokens", depth: 3 as const },
];

export function Example() {
	return (
		<aside className="sticky top-20">
			<TableOfContents items={items} scrollOffset={56} />
		</aside>
	);
}
