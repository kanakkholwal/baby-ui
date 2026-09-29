"use client";

import { ChartContainer, FunnelChart } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { SIGNUP_FUNNEL } from "../data/revenue-tree";

type Props = Record<string, unknown>;

export function FunnelChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof FunnelChart>>(props);
	const orientation = p.orientation ?? "horizontal";
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
					edges={p.edges ?? "curved"}
					labelLayout={p.labelLayout ?? "spread"}
					pattern={p.pattern ?? "none"}
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
