"use client";

import {
	Background,
	Badge,
	CartesianGrid,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
	Line,
	LineChart,
	ReferenceArea,
	SelectionArea,
	XAxis,
	YAxis,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { localeProp, VISITORS } from "../data/visitors";
import { config } from "../shared/charts";

type Props = Record<string, unknown>;
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
