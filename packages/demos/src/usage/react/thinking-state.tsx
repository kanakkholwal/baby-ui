"use client";

import { ThinkingState } from "@baby-ui/react";

export function Example() {
	return (
		<ThinkingState
			variant="steps"
			thinking
			activeLabel="Thinking"
			doneLabel="Thought for 4 seconds"
			rows={[
				{ primary: "Reading flavor briefs" },
				{ primary: "Writing the scoop report", status: "active" },
			]}
		/>
	);
}
