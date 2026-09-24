"use client";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	type RingCap,
	RingChart,
} from "@baby-ui/react";
import { GOALS, GOALS_CONFIG } from "../data/channels";

type Props = Record<string, unknown>;

const config = GOALS_CONFIG satisfies ChartConfig;

export function RingChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-sm">
			<ChartContainer config={config} title="Daily goals" aspect="square">
				<RingChart
					data={GOALS}
					cap={(props.cap as RingCap) ?? "round"}
					track={props.track !== false}
					strokeWidth={Number(props.strokeWidth ?? 12)}
					gap={Number(props.gap ?? 6)}
				/>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
