"use client";

import { UpvoteButton } from "@baby-ui/react";

export function Example() {
	return (
		<div className="flex items-start gap-6">
			<UpvoteButton count={482} />
			<UpvoteButton count={482} variant="secondary" />
			<UpvoteButton count={482} variant="success" orientation="horizontal" />
			<UpvoteButton
				count={482}
				orientation="horizontal"
				className="[--upvote-color:oklch(0.7_0.19_30)] [--upvote-on:white]"
			/>
		</div>
	);
}
