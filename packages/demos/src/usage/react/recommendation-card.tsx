"use client";

import { RecommendationCard, type RecommendationOption } from "@baby-ui/react";

const OPTIONS: RecommendationOption[] = [
	{
		key: "high",
		body: "Reorder waffle cones from Cone King with a 7-day lead time.",
		short: "Reorder from Cone King · 7-day lead",
		signal: 3,
		tone: "var(--success)",
		label: "High confidence",
		cta: "Accept",
		ctaVariant: "default",
	},
];

export function Example() {
	return (
		<RecommendationCard title="Want me to place this restock order?" options={OPTIONS} />
	);
}
