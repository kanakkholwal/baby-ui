"use client";

import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	SunburstChart,
} from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { REVENUE_TREE, REVENUE_TREE_CONFIG } from "../data/revenue-tree";

type Props = Record<string, unknown>;

const config = REVENUE_TREE_CONFIG satisfies ChartConfig;

export function SunburstChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof SunburstChart>>(props);
	return (
		<div className="w-full max-w-md">
			<ChartContainer config={config} title="Revenue by region" aspect="square">
				<SunburstChart
					data={REVENUE_TREE}
					variant={p.variant ?? "sunburst"}
					labels={props.labels !== false}
					breadcrumb={props.breadcrumb !== false}
					hoverPop={Number(props.hoverPop ?? 8)}
					staggerScale={Number(props.staggerScale ?? 1)}
				/>
				<ChartLegend />
			</ChartContainer>
		</div>
	);
}
