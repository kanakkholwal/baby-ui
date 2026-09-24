"use client";

import {
	ChartContainer,
	type ChartStatus,
	HeatmapChart,
	HeatmapLegend,
	type HeatmapShape,
	type HeatmapWeekStart,
} from "@baby-ui/react";
import { DAILY_ACTIVITY } from "../data/flows";
import { localeProp } from "../data/visitors";

type Props = Record<string, unknown>;

export function HeatmapChartDemo({ props }: { props: Props }) {
	const shape = (props.shape as HeatmapShape) ?? "rounded";
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
					weekStart={(props.weekStart as HeatmapWeekStart) ?? "auto"}
					gap={Number(props.gap ?? 3)}
					locale={locale}
					status={(props.status as ChartStatus) ?? "ready"}
				/>
				{props.legend !== false ? (
					<HeatmapLegend shape={shape} patterns={patterns} />
				) : null}
			</ChartContainer>
		</div>
	);
}
