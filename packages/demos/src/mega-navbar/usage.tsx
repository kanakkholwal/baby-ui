"use client";

import { Button, type MegaMenuGroup, MegaNavbar } from "@baby-ui/react";

const groups: MegaMenuGroup[] = [
	{
		label: "Product",
		href: "/features",
		items: [
			{ label: "Features", href: "/features", description: "Everything the app does" },
			{ label: "Pricing", href: "/pricing", description: "Plans and billing" },
		],
		footer: { label: "Start free", href: "/signup", hint: "No card needed" },
	},
];

export function Example() {
	return (
		<MegaNavbar
			active="/features"
			brand={<span className="font-semibold text-foreground">Acme</span>}
			groups={groups}
			links={[{ label: "Docs", href: "/docs" }]}
			actions={<Button size="sm">Sign up</Button>}
		/>
	);
}
