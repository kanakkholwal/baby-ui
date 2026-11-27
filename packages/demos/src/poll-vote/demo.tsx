"use client";

import { PollVote } from "@baby-ui/react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const OPTIONS = [
	{ id: "springs", label: "Springs", votes: 42 },
	{ id: "curves", label: "Easing curves", votes: 27 },
	{ id: "both", label: "Both, it depends", votes: 31 },
];

export function PollVoteDemo({ props }: { props: Props }) {
	const p = controlProps<{ size: "sm" | "default" | "lg" }>(props);
	return (
		<div className="w-72">
			<PollVote options={OPTIONS} size={p.size ?? "default"} />
		</div>
	);
}
