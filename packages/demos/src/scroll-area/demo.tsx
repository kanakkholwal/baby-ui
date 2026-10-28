"use client";

import { ScrollArea } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const REGIONS = [
	"Amsterdam",
	"Bengaluru",
	"Cape Town",
	"Dublin",
	"Frankfurt",
	"Hong Kong",
	"Johannesburg",
	"London",
	"Mumbai",
	"Paris",
	"São Paulo",
	"Singapore",
	"Sydney",
	"Tokyo",
	"Toronto",
	"Washington DC",
];

export function ScrollAreaDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ScrollArea>>(props);
	return (
		<div className="w-64 rounded-xl border border-border bg-card p-1">
			<ScrollArea maxHeight={p.maxHeight || "12rem"}>
				<ul className="flex flex-col">
					{REGIONS.map((region) => (
						<li
							key={region}
							className="rounded-lg px-3 py-2 text-foreground text-sm hover:bg-foreground/[0.04]"
						>
							{region}
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}
