"use client";

import { PollVote } from "@baby-ui/react";

const OPTIONS = [
	{ id: "springs", label: "Springs", votes: 42 },
	{ id: "curves", label: "Easing curves", votes: 27 },
	{ id: "both", label: "Both, it depends", votes: 31 },
];

export function Example() {
	return (
		<div className="w-72">
			<PollVote options={OPTIONS} />
		</div>
	);
}
