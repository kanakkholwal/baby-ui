"use client";

import {
	CollabCard,
	type CollabCardCollaborator,
	type CollabCardTone,
} from "@baby-ui/react";

type Props = Record<string, unknown>;

const COLLABORATORS: [CollabCardCollaborator, CollabCardCollaborator] = [
	{
		name: "Dylan",
		pill: "bg-chart-4",
		pillText: "text-background",
		cursor: "text-chart-4",
	},
	{
		name: "Evan",
		pill: "bg-chart-2",
		pillText: "text-background",
		cursor: "text-chart-2",
	},
];

const PRESENCE_COLORS = [
	"var(--chart-4)",
	"var(--chart-2)",
	"var(--chart-1)",
	"var(--chart-3)",
];

export function CollabCardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-md">
			<CollabCard
				greeting={(props.greeting as string) || undefined}
				eyebrow={(props.eyebrow as string) || undefined}
				intro={(props.intro as string) || undefined}
				conjunction={(props.conjunction as string) || undefined}
				trailing={(props.trailing as string) || undefined}
				backgroundUrl={
					(props.backgroundUrl as string) || "https://picsum.photos/id/1043/800/500"
				}
				tone={(props.tone as CollabCardTone) ?? "inverted"}
				collaborators={COLLABORATORS}
				presenceColors={PRESENCE_COLORS}
				extraCount={Number(props.extraCount ?? 2)}
			/>
		</div>
	);
}
