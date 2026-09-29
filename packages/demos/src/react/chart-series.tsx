"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = { desktop: VISITORS_CONFIG.desktop } satisfies ChartConfig;
const data = VISITORS.slice(-12);

export function ChartSeriesDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof LineChart>>(props);
	const pLine = controlProps<ComponentProps<typeof Line>>(props);
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<LineChart data={data} status={p.status ?? "loading"}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line
						dataKey="desktop"
						curve="monotone"
						showMarkers
						terminalMarker
						dashFromIndex={9}
						markerAppearance={pLine.markerAppearance ?? "ring"}
						loadingStyle={pLine.loadingStyle ?? "pulse"}
					/>
					<ChartTooltip />
				</LineChart>
			</ChartContainer>
		</div>
	);
}
