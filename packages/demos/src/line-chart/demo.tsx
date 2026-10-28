"use client";

import {
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartTooltip,
	Line,
	LineChart,
	ProfitLossLine,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { PNL, PNL_CONFIG } from "../data/pnl";
import { controlProps } from "../data/preview-props";
import { fadeProp, VISITORS } from "../data/visitors";
import { config } from "../shared/charts";

type Props = Record<string, unknown>;

export function LineChartDemo({ props }: { props: Props }) {
	const pChart = controlProps<ComponentProps<typeof LineChart>>(props);
	const pLine = controlProps<ComponentProps<typeof Line>>(props);
	const pPnl = controlProps<ComponentProps<typeof ProfitLossLine>>(props);
	const status = pChart.status ?? "ready";
	const dashFromIndex = pLine.dashFromIndex ?? -1;
	const line = {
		curve: pLine.curve ?? "natural",
		variant: pLine.variant ?? "solid",
		strokeWidth: pLine.strokeWidth ?? 2.5,
		fadeEdges: fadeProp(props.fadeEdges),
		loadingStyle: pLine.loadingStyle ?? "pulse",
		showMarkers: pLine.showMarkers ?? false,
		terminalMarker: pLine.terminalMarker ?? false,
		showHighlight: pLine.showHighlight ?? true,
		dashFromIndex: dashFromIndex >= 0 ? dashFromIndex : undefined,
	};
	if (pPnl.encoding === "dashed" || pPnl.encoding === "dotted") {
		return (
			<div className="w-full max-w-3xl">
				<ChartContainer config={PNL_CONFIG} title="Daily profit and loss">
					<LineChart data={PNL} status={status}>
						<CartesianGrid />
						<YAxis />
						<XAxis />
						<ProfitLossLine
							dataKey="pnl"
							encoding={pPnl.encoding}
							curve={line.curve}
							strokeWidth={line.strokeWidth}
						/>
						<ChartTooltip />
					</LineChart>
				</ChartContainer>
			</div>
		);
	}
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={config} title="Daily visitors">
				<LineChart data={VISITORS} status={status}>
					<CartesianGrid />
					<YAxis />
					<XAxis />
					<Line dataKey="desktop" {...line} />
					<Line dataKey="mobile" {...line} />
					<ChartTooltip />
				</LineChart>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
