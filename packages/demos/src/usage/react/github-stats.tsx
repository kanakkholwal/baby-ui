"use client";

import { GithubStats } from "@baby-ui/react";
import { DEMO_GITHUB_STATS } from "../../data/github-stats";

export function Example() {
	return (
		<div className="w-full max-w-5xl">
			<GithubStats data={DEMO_GITHUB_STATS} locale="en-US" />
		</div>
	);
}
