"use client";

import { type GaugeChartLayout, type GaugeChartTone, ScoreCard } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function ScoreCardDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-xs">
			<ScoreCard
				title="Performance"
				description="Lighthouse, last deploy"
				value={87}
				trend={4}
				tone={(props.tone as GaugeChartTone) ?? "primary"}
				layout={(props.layout as GaugeChartLayout) ?? "arc"}
			/>
		</div>
	);
}
