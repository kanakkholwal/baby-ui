"use client";

import {
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	type ChartMarkerAppearance,
	type ChartMarkerSize,
	ChartMarkers,
	ChartMarkerTooltip,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { EVENTS } from "../data/events";
import { VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;
const markers = EVENTS.map((event, i) =>
	i === 0
		? { ...event, href: "https://github.com/bklit/bklit-ui", target: "_blank" as const }
		: event,
);

export function ChartMarkersDemo({ props }: { props: Props }) {
	return (
		<div className="w-full max-w-3xl pt-6">
			<ChartContainer config={config} title="Daily visitors with release notes">
				<LineChart data={VISITORS} margin={{ top: 32 }}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" />
					<ChartMarkers
						items={markers}
						size={(props.size as ChartMarkerSize) ?? "md"}
						appearance={(props.appearance as ChartMarkerAppearance) ?? "solid"}
						showLines={props.showLines !== false}
					/>
					<ChartTooltip
						content={
							<>
								<ChartTooltipContent />
								<ChartMarkerTooltip items={markers} />
							</>
						}
					/>
				</LineChart>
			</ChartContainer>
		</div>
	);
}
