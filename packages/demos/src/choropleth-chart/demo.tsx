"use client";

import { ChartContainer, ChoroplethChart } from "@baby-ui/react";
import type { ComponentProps } from "react";
import { controlProps } from "../data/preview-props";
import { WORLD, WORLD_VALUES } from "../data/world";

type Props = Record<string, unknown>;

export function ChoroplethChartDemo({ props }: { props: Props }) {
	const p = controlProps<ComponentProps<typeof ChoroplethChart>>(props);
	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={{}} title="Sample index by country" aspect="wide">
				<ChoroplethChart
					data={WORLD}
					values={WORLD_VALUES}
					projection={p.projection ?? "equalEarth"}
					graticule={p.graticule ?? true}
					legend={p.legend ?? true}
					zoomable={p.zoomable ?? false}
					dimOpacity={p.dimOpacity ?? 0.4}
					labels={{ value: "Index" }}
				/>
			</ChartContainer>
		</div>
	);
}
