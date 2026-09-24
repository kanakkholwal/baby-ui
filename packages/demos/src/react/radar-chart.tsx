"use client";

import {
	ChartContainer,
	ChartLegend,
	RadarArea,
	RadarAxis,
	RadarChart,
	RadarGrid,
	type RadarGridShape,
	RadarLabels,
	RadarTooltip,
	type RadarVariant,
} from "@baby-ui/react";
import { RADAR_CONFIG, RADAR_METRICS, RADAR_SERIES } from "../data/radar";

type Props = Record<string, unknown>;

export function RadarChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-md">
			<ChartContainer config={RADAR_CONFIG} title="Player profiles" aspect="square">
				<RadarChart
					data={RADAR_SERIES}
					metrics={RADAR_METRICS}
					grid={(props.grid as RadarGridShape) ?? "polygon"}
					variant={(props.variant as RadarVariant) ?? "filled"}
					levels={Number(props.levels ?? 5)}
				>
					<RadarGrid />
					<RadarAxis />
					<RadarLabels />
					{RADAR_SERIES.map((s, i) => (
						<RadarArea key={s.label} index={i} showPoints={props.showPoints !== false} />
					))}
					<RadarTooltip />
				</RadarChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
