"use client";

import { Badge, RecommendationCard, type RecommendationOption } from "@baby-ui/react";

type Props = Record<string, unknown>;

const OPTIONS: RecommendationOption[] = [
	{
		key: "high",
		body: (
			<>
				Reorder waffle cones from <Badge variant="secondary">Cone King</Badge> with lead
				time <Badge variant="success">7 days</Badge>
			</>
		),
		short: "Reorder from Cone King · 7-day lead",
		signal: 3,
		tone: "var(--success)",
		label: "High confidence",
		cta: "Accept",
		ctaVariant: "default",
	},
	{
		key: "review",
		body: (
			<>
				Switch vanilla to <Badge variant="secondary">Vanilla Madagascar</Badge> for peak
				season.
			</>
		),
		short: "Switch to Vanilla Madagascar",
		signal: 2,
		tone: "var(--warning)",
		label: "Needs review",
		cta: "Configure",
		ctaVariant: "secondary",
	},
	{
		key: "none",
		body: (
			<>
				Fall back to a <span className="font-medium text-foreground">full restock</span>{" "}
				across every SKU.
			</>
		),
		short: "Full restock across every SKU",
		signal: 0,
		tone: "var(--muted-foreground)",
		label: "No signal",
		cta: "Accept full restock",
		ctaVariant: "secondary",
	},
];

export function RecommendationCardDemo({ props: _props }: { props: Props }) {
	return (
		<RecommendationCard title="Want me to place this restock order?" options={OPTIONS} />
	);
}
