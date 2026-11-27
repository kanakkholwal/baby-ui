"use client";

import { UpvoteButton, type UpvoteOrientation, type UpvoteVariant } from "@baby-ui/react";
import { useEffect, useState } from "react";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function UpvoteButtonDemo({ props }: { props: Props }) {
	const p = controlProps<{
		orientation: UpvoteOrientation;
		variant: UpvoteVariant;
		label: string;
	}>(props);
	// The `voted` control sets the starting state; the button still toggles on click.
	const [voted, setVoted] = useState(props.voted === true);
	useEffect(() => {
		if (props.voted !== undefined) setVoted(props.voted === true);
	}, [props.voted]);
	return (
		<UpvoteButton
			count={Number(props.count ?? 482)}
			orientation={p.orientation ?? "vertical"}
			variant={p.variant ?? "default"}
			label={p.label || "Upvote"}
			voted={voted}
			onVotedChange={setVoted}
		/>
	);
}
