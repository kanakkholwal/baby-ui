"use client";

import { DocsNav } from "@baby-ui/react";

const sections = [
	{
		id: "start",
		label: "Getting started",
		items: [
			{ href: "/docs", label: "Introduction" },
			{ href: "/docs/installation", label: "Installation" },
		],
	},
	{
		id: "components",
		label: "Components",
		count: 2,
		items: [
			{ href: "/docs/button", label: "Button" },
			{ href: "/docs/dialog", label: "Dialog", badge: "beta" },
		],
	},
];

export function Example({ pathname }: { pathname: string }) {
	return <DocsNav sections={sections} current={pathname} connector="curve" />;
}
