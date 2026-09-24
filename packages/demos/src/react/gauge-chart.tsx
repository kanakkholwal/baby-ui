"use client";

import { GaugeChart, type GaugeChartLayout, type GaugeChartTone } from "@baby-ui/react";

type Props = Record<string, unknown>;

export function GaugeChartDemo({ props }: { props: Props }) {
	const layout = (props.layout as GaugeChartLayout) ?? "arc";
	return (
		<div className={layout === "linear" ? "w-full max-w-md" : "w-full max-w-sm"}>
			<GaugeChart
				value={Number(props.value ?? 72)}
				layout={layout}
				tone={(props.tone as GaugeChartTone) ?? "primary"}
				notches={Number(props.notches ?? 40)}
				spacing={Number(props.spacing ?? 25)}
				label={(props.label as string) || undefined}
				showValue={props.showValue !== false}
			/>
		</div>
	);
}
