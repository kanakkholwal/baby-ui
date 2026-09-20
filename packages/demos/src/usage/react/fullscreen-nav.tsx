"use client";

import { FullscreenNav } from "@baby-ui/react";
import { useState } from "react";

const links = [
	{ href: "/work", label: "Work" },
	{ href: "/studio", label: "Studio" },
	{ href: "/contact", label: "Contact" },
];

export function Example() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button type="button" onClick={() => setOpen(true)}>
				Menu
			</button>
			<FullscreenNav open={open} onOpenChange={setOpen} links={links} title="Menu" />
		</>
	);
}
