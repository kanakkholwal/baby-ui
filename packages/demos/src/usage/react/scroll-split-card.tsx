"use client";

import { ScrollSplitCard } from "@baby-ui/react";

const cards = [
	{ title: "Plan", description: "Map the journey first." },
	{ title: "Build", description: "Ship in small steps." },
	{ title: "Grow", description: "Keep what works." },
];

export function Example() {
	return (
		<ScrollSplitCard
			image="https://picsum.photos/id/1018/1200/600"
			imageAlt="Mountain valley"
			cards={cards}
		/>
	);
}
