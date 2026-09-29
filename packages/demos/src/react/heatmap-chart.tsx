"use client";

import { ChartContainer, HeatmapChart, HeatmapLegend } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { DAILY_ACTIVITY } from "../data/flows";
import { controlProps } from "../data/preview-props";
import { localeProp } from "../data/visitors";

type Props = Record<string, unknown>;

export function HeatmapChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof HeatmapChart>>(props);
	const shape = p.shape ?? "rounded";
	const patterns = props.patterns === true;
	const locale = localeProp(props.locale);
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer
				config={{}}
				title="Daily activity"
				aspect="auto"
				className="h-56"
				locale={locale}
			>
				<HeatmapChart
					data={DAILY_ACTIVITY}
					shape={shape}
					patterns={patterns}
					weekStart={p.weekStart ?? "auto"}
					gap={Number(props.gap ?? 3)}
					locale={locale}
					status={p.status ?? "ready"}
				/>
				{props.legend !== false ? (
					<HeatmapLegend shape={shape} patterns={patterns} />
				) : null}
			</ChartContainer>
		</div>
	);
}
