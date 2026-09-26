"use client";

import {
	ScrollSplitCard,
	type ScrollSplitCardSize,
	type ScrollSplitCardTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

const CARDS = [
	{ title: "Plan", description: "Map the journey before a single pixel moves." },
	{ title: "Build", description: "Ship small, measured steps behind real data." },
	{ title: "Grow", description: "Tune what works and retire what does not." },
];

export function ScrollSplitCardDemo({ props }: { props: Props }) {
	return (
		<ScrollSplitCard
			image="https://picsum.photos/id/1018/1200/600"
			imageAlt="Mountain valley under a clear sky"
			cards={CARDS}
			tone={(props.tone as ScrollSplitCardTone) ?? "card"}
			size={(props.size as ScrollSplitCardSize) ?? "md"}
			hint={(props.hint as string) ?? "Scroll down"}
			endLabel={(props.endLabel as string) ?? "So cool, right?"}
		/>
	);
}
