"use client";

import { type ChartConfig, ChartContainer, ChartLegend, PieChart } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { CHANNELS, CHANNELS_CONFIG } from "../data/channels";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

const config = CHANNELS_CONFIG satisfies ChartConfig;

export function PieChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof PieChart>>(props);
	return (
		<div className="w-full max-w-sm">
			<ChartContainer config={config} title="Traffic by channel" aspect="square">
				<PieChart
					data={CHANNELS}
					variant={p.variant ?? "donut"}
					hover={p.hover ?? "translate"}
					hoverOffset={Number(p.hoverOffset ?? 10)}
					cornerRadius={Number(p.cornerRadius ?? 4)}
					labels={p.labels !== false}
				/>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
