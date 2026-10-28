"use client";

import { Button, FullscreenNav } from "@baby-ui/react";
import { type ComponentProps, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const FULLSCREEN_LINKS = [
	{ href: "#product", label: "Product", description: "What it does and who it is for" },
	{ href: "#pricing", label: "Pricing", description: "Plans for teams of every size" },
	{ href: "#docs", label: "Docs", description: "Guides and API reference" },
	{ href: "#blog", label: "Blog", description: "Release notes and stories" },
];

export function FullscreenNavDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FullscreenNav>>(props);
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button variant="outline" onClick={() => setOpen(true)}>
				Open navigation
			</Button>
			<FullscreenNav
				links={FULLSCREEN_LINKS}
				open={open}
				onOpenChange={setOpen}
				current="#product"
				title={p.title || "Menu"}
				variant={p.variant ?? "fade"}
				align={p.align ?? "start"}
				size={p.size ?? "default"}
				numbered={p.numbered ?? false}
				footer={<span>hello@example.com</span>}
			/>
		</>
	);
}
