"use client";

import {
	ChartContainer,
	SankeyChart,
	type SankeyLinkColor,
	type SankeyOrientation,
} from "@baby-ui/react";
import { TRAFFIC_FLOWS } from "../data/flows";

type Props = Record<string, unknown>;

export function SankeyChartDemo({ props }: { props: Props }) {
	const orientation = (props.orientation as SankeyOrientation) ?? "horizontal";
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
					linkColor={(props.linkColor as SankeyLinkColor) ?? "gradient"}
					labels={props.labels !== false}
					nodeWidth={Number(props.nodeWidth ?? 16)}
					nodePadding={Number(props.nodePadding ?? 24)}
				/>
			</ChartContainer>
		</div>
	);
}
