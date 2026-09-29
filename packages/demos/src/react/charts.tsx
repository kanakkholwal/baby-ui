"use client";

import {
	Background,
	Badge,
	CartesianGrid,
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	ProfitLossLine,
	ReferenceArea,
	SelectionArea,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { PNL, PNL_CONFIG } from "../data/pnl";
import { controlProps } from "../data/preview-props";
import { fadeProp, localeProp, VISITORS, VISITORS_CONFIG } from "../data/visitors";

type Props = Record<string, unknown>;

const config = VISITORS_CONFIG satisfies ChartConfig;
const BASE_PARTS = ["Grid", "Axes", "Tooltip", "Legend"];

export function ChartDemo({ props }: { props: Props }) {
	const pCont = controlProps<ComponentProps<typeof ChartContainer>>(props);
	const pChart = controlProps<ComponentProps<typeof LineChart>>(props);
	const pBg = controlProps<ComponentProps<typeof Background>>(props);
	const pGrid = controlProps<ComponentProps<typeof CartesianGrid>>(props);
	const pRef = controlProps<ComponentProps<typeof ReferenceArea>>(props);
	const pSel = controlProps<ComponentProps<typeof SelectionArea>>(props);
	const pTip = controlProps<ComponentProps<typeof ChartTooltip>>(props);
	const pTipContent = controlProps<ComponentProps<typeof ChartTooltipContent>>(props);
	const pLegend = controlProps<ComponentProps<typeof ChartLegendContent>>(props);
	return (
		<div
			className={pCont.aspect === "auto" ? "h-80 w-full max-w-3xl" : "w-full max-w-3xl"}
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
				aspect={pCont.aspect ?? "video"}
				locale={localeProp(props.locale)}
			>
				<LineChart data={VISITORS} status={pChart.status ?? "ready"}>
					{props.background && props.background !== "none" ? (
						<Background variant={pBg.variant} />
					) : null}
					<CartesianGrid variant={pGrid.variant ?? "dashed"} />
					{props.tone && props.tone !== "none" ? (
						<ReferenceArea y1={2400} y2={3000} label="Target" tone={pRef.tone} />
					) : null}
					<YAxis />
					<XAxis />
					<SelectionArea edge={pSel.edge ?? "dashed"} />
					<Line dataKey="desktop" />
					<Line dataKey="mobile" />
					<ChartTooltip
						datePill={pTip.datePill ?? true}
						content={<ChartTooltipContent indicator={pTipContent.indicator ?? "dot"} />}
					/>
				</LineChart>
				<ChartLegend content={<ChartLegendContent align={pLegend.align ?? "center"} />} />
			</ChartContainer>
		</div>
	);
}

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
