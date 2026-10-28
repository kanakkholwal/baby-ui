"use client";

import { GithubStats } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { DEMO_GITHUB_STATS } from "../data/github-stats";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function GithubStatsDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof GithubStats>>(props);
	const view = p.view === "weeks" ? "weeks" : "days";
	return (
		<div className="w-full max-w-5xl">
			<GithubStats
				key={view}
				data={DEMO_GITHUB_STATS}
				variant={p.variant ?? "default"}
				locale={p.locale || undefined}
				defaultView={view}
			/>
		</div>
	);
}
