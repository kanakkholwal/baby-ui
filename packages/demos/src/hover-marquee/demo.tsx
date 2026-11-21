"use client";

import { HoverMarquee } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const titles = [
	"Quarterly planning notes with the whole design team",
	"Why the checkout flow drops users on the payment step",
	"Short title",
];

export function HoverMarqueeDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof HoverMarquee>>(props);
	return (
		<ul className="grid w-full max-w-64 grid-cols-[minmax(0,1fr)] gap-1">
			{titles.map((title) => (
				<li
					key={title}
					className="rounded-md px-2 py-1.5 text-sm hover:bg-foreground/[0.06]"
				>
					<HoverMarquee
						text={p.text ?? title}
						variant={p.variant}
						pixelsPerSecond={p.pixelsPerSecond}
					/>
				</li>
			))}
		</ul>
	);
}
