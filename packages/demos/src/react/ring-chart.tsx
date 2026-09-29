"use client";

import { type ChartConfig, ChartContainer, ChartLegend, RingChart } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { GOALS, GOALS_CONFIG } from "../data/channels";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const config = GOALS_CONFIG satisfies ChartConfig;

export function RingChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RingChart>>(props);
	return (
		<div className="w-full max-w-sm">
			<ChartContainer config={config} title="Daily goals" aspect="square">
				<RingChart
					data={GOALS}
					cap={p.cap ?? "round"}
					track={p.track !== false}
					strokeWidth={Number(p.strokeWidth ?? 12)}
					gap={Number(p.gap ?? 6)}
				/>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
