"use client";

import { ContextCards, type ContextChunk } from "@baby-ui/react";

type Props = Record<string, unknown>;

const CHUNKS: ContextChunk[] = [
	{
		title: "Vendor onboarding rule",
		chars: "290 characters",
		body: "Cold-chain certification must be verified before a new dairy can be added to the reorder workflow.",
		source: "Dairy Onboarding SOP.pdf",
		badge: "PDF",
		tone: "destructive",
	},
	{
		title: "Seasonal demand row",
		chars: "1,250 characters",
		body: "Q4 velocity table: pistachio +18%, vanilla +6%, rocky road -11%; retire flavors below 40 scoops weekly.",
		source: "Sales Velocity Export.csv",
		badge: "CSV",
		tone: "success",
	},
];

export function ContextCardsDemo({ props }: { props: Props }) {
	return (
		<ContextCards
			chunks={CHUNKS}
			header={(props.header as string) || "All chunks"}
			count={(props.count as string) || 32}
		/>
	);
}
