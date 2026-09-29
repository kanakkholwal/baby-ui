"use client";

import {
	ChartContainer,
	ChartLegend,
	RadarArea,
	RadarAxis,
	RadarChart,
	RadarGrid,
	RadarLabels,
	RadarTooltip,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { RADAR_CONFIG, RADAR_METRICS, RADAR_SERIES } from "../data/radar";

type Props = Record<string, unknown>;

export function RadarChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof RadarChart>>(props);
	const pArea = controlProps<ComponentProps<typeof RadarArea>>(props);
	return (
		<div className="w-full max-w-md">
			<ChartContainer config={RADAR_CONFIG} title="Player profiles" aspect="square">
				<RadarChart
					data={RADAR_SERIES}
					metrics={RADAR_METRICS}
					grid={p.grid ?? "polygon"}
					variant={p.variant ?? "filled"}
					levels={Number(p.levels ?? 5)}
				>
					<RadarGrid />
					<RadarAxis />
					<RadarLabels />
					{RADAR_SERIES.map((s, i) => (
						<RadarArea key={s.label} index={i} showPoints={pArea.showPoints !== false} />
					))}
					<RadarTooltip />
				</RadarChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
