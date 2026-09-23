"use client";

import { Footer, type FooterColumn } from "@baby-ui/react";

const columns: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "Features", href: "/features" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
];

export function Example() {
	return (
		<Footer
			brand={<span className="font-semibold text-foreground">Acme</span>}
			description="A one-line pitch for what you build."
			columns={columns}
			copyright={`© ${new Date().getFullYear()} Acme, Inc.`}
			wordmark="Acme"
		/>
	);
}
