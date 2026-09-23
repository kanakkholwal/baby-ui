"use client";

import { CollabCard, type CollabCardCollaborator } from "@baby-ui/react";

type Props = Record<string, unknown>;

const COLLABORATORS: [CollabCardCollaborator, CollabCardCollaborator] = [
	{
		name: "Dylan",
		pill: "bg-[#A259FF]",
		pillText: "text-white",
		cursor: "text-[#A259FF]",
	},
	{
		name: "Evan",
		pill: "bg-[#FF7262]",
		pillText: "text-white",
		cursor: "text-[#FF7262]",
	},
];

const PRESENCE_COLORS = ["#A259FF", "#FF7262", "#1ABCFE", "#0ACF83"];

export function CollabCardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-md">
			<CollabCard
				greeting={(props.greeting as string) || undefined}
				eyebrow={(props.eyebrow as string) || undefined}
				collaborators={COLLABORATORS}
				presenceColors={PRESENCE_COLORS}
				extraCount={Number(props.extraCount ?? 2)}
			/>
		</div>
	);
}
