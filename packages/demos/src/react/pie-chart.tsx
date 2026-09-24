"use client";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	PieChart,
	type PieHover,
	type PieVariant,
} from "@baby-ui/react";
import { CHANNELS, CHANNELS_CONFIG } from "../data/channels";

type Props = Record<string, unknown>;

const config = CHANNELS_CONFIG satisfies ChartConfig;

export function PieChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-sm">
			<ChartContainer config={config} title="Traffic by channel" aspect="square">
				<PieChart
					data={CHANNELS}
					variant={(props.variant as PieVariant) ?? "donut"}
					hover={(props.hover as PieHover) ?? "translate"}
					hoverOffset={Number(props.hoverOffset ?? 10)}
					cornerRadius={Number(props.cornerRadius ?? 4)}
					labels={props.labels !== false}
				/>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
