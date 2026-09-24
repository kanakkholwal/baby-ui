"use client";

import {
	Background,
	Badge,
	CartesianGrid,
	type ChartAspect,
	type ChartBackgroundVariant,
	type ChartConfig,
	ChartContainer,
	type ChartGridVariant,
	ChartLegend,
	type ChartLegendAlign,
	ChartLegendContent,
	type ChartReferenceTone,
	type ChartSelectionEdge,
	type ChartStatus,
	ChartTooltip,
	ChartTooltipContent,
	type ChartTooltipIndicator,
	Line,
	LineChart,
	type LineCurve,
	type LineVariant,
	type ProfitLossEncoding,
	ProfitLossLine,
	ReferenceArea,
	SelectionArea,
	type SeriesLoadingStyle,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import { PNL, PNL_CONFIG } from "../data/pnl";
import { fadeProp, localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;
const BASE_PARTS = ["Grid", "Axes", "Tooltip", "Legend"];

export function ChartDemo({ props }: { props: Props }) {
	return (
		<div
			className={props.aspect === "auto" ? "h-80 w-full max-w-3xl" : "w-full max-w-3xl"}
		>
			<div className="mb-2 flex flex-wrap gap-1.5">
				{BASE_PARTS.map((part) => (
					<Badge key={part} variant="outline" size="sm">
						{part}
					</Badge>
				))}
			</div>
			<ChartContainer
				config={config}
				title="Chart base"
				aspect={(props.aspect as ChartAspect) ?? "video"}
				locale={localeProp(props.locale)}
			>
				<LineChart data={VISITORS} status={(props.status as ChartStatus) ?? "ready"}>
					{props.background && props.background !== "none" ? (
						<Background variant={props.background as ChartBackgroundVariant} />
					) : null}
					<CartesianGrid variant={(props.variant as ChartGridVariant) ?? "dashed"} />
					{props.tone && props.tone !== "none" ? (
						<ReferenceArea
							y1={2400}
							y2={3000}
							label="Target"
							tone={props.tone as ChartReferenceTone}
						/>
					) : null}
					<YAxis />
					<XAxis />
					<SelectionArea edge={(props.edge as ChartSelectionEdge) ?? "dashed"} />
					<Line dataKey="desktop" />
					<Line dataKey="mobile" />
					<ChartTooltip
						datePill={props.datePill !== false}
						content={
							<ChartTooltipContent
								indicator={(props.indicator as ChartTooltipIndicator) ?? "dot"}
							/>
						}
					/>
				</LineChart>
				<ChartLegend
					content={
						<ChartLegendContent align={(props.align as ChartLegendAlign) ?? "center"} />
					}
				/>
			</ChartContainer>
		</div>
	);
}

export function LineChartDemo({ props }: { props: Props }) {
	const status = (props.status as ChartStatus) ?? "ready";
	const dashFromIndex = Number(props.dashFromIndex ?? -1);
	const line = {
		curve: (props.curve as LineCurve) ?? "natural",
		variant: (props.variant as LineVariant) ?? "solid",
		strokeWidth: Number(props.strokeWidth ?? 2.5),
		fadeEdges: fadeProp(props.fadeEdges),
		loadingStyle: (props.loadingStyle as SeriesLoadingStyle) ?? "pulse",
		showMarkers: props.showMarkers === true,
		terminalMarker: props.terminalMarker === true,
		showHighlight: props.showHighlight !== false,
		dashFromIndex: dashFromIndex >= 0 ? dashFromIndex : undefined,
	};
	if (props.encoding === "dashed" || props.encoding === "dotted") {
		return (
			<div className="w-full max-w-3xl">
				<ChartContainer config={PNL_CONFIG} title="Daily profit and loss">
					<LineChart data={PNL} status={status}>
						<CartesianGrid />
						<YAxis />
						<XAxis />
						<ProfitLossLine
							dataKey="pnl"
							encoding={props.encoding as ProfitLossEncoding}
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
