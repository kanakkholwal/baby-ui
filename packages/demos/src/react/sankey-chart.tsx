"use client";

import { ChartContainer, SankeyChart } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { TRAFFIC_FLOWS } from "../data/flows";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;

export function SankeyChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SankeyChart>>(props);
	const orientation = p.orientation ?? "horizontal";
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer
				config={{}}
				title="Visitor journeys"
				aspect={orientation === "vertical" ? "square" : "wide"}
			>
				<SankeyChart
					data={TRAFFIC_FLOWS}
					orientation={orientation}
					linkColor={p.linkColor ?? "gradient"}
					labels={p.labels !== false}
					nodeWidth={Number(p.nodeWidth ?? 16)}
					nodePadding={Number(p.nodePadding ?? 24)}
				/>
			</ChartContainer>
		</div>
	);
}
