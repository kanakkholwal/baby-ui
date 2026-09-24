"use client";

import {
	ChartContainer,
	FunnelChart,
	type FunnelEdges,
	type FunnelLabelLayout,
	type FunnelOrientation,
} from "@baby-ui/react";
import { SIGNUP_FUNNEL } from "../data/revenue-tree";

type Props = Record<string, unknown>;

export function FunnelChartDemo({ props }: { props: Props }) {
	const orientation = (props.orientation as FunnelOrientation) ?? "horizontal";
	return (
		<div className={orientation === "vertical" ? "w-full max-w-sm" : "w-full max-w-3xl"}>
			<ChartContainer
				config={{}}
				title="Signup funnel"
				aspect={orientation === "vertical" ? "square" : "wide"}
			>
				<FunnelChart
					data={SIGNUP_FUNNEL}
					orientation={orientation}
					edges={(props.edges as FunnelEdges) ?? "curved"}
					labelLayout={(props.labelLayout as FunnelLabelLayout) ?? "spread"}
					layers={Number(props.layers ?? 3)}
					gap={Number(props.gap ?? 4)}
					grid={props.grid === true}
					showValues={props.showValues !== false}
					showPercentage={props.showPercentage !== false}
					showLabels={props.showLabels !== false}
				/>
			</ChartContainer>
		</div>
	);
}
