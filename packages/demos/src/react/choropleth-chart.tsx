"use client";

import {
	ChartContainer,
	ChoroplethChart,
	type ChoroplethProjection,
} from "@baby-ui/react";
import { WORLD, WORLD_VALUES } from "../data/world";

type Props = Record<string, unknown>;

export function ChoroplethChartDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={{}} title="Sample index by country" aspect="wide">
				<ChoroplethChart
					data={WORLD}
					values={WORLD_VALUES}
					projection={(props.projection as ChoroplethProjection) ?? "equalEarth"}
					graticule={props.graticule !== false}
					legend={props.legend !== false}
					zoomable={props.zoomable === true}
					dimOpacity={Number(props.dimOpacity ?? 0.4)}
					labels={{ value: "Index" }}
				/>
			</ChartContainer>
		</div>
	);
}
