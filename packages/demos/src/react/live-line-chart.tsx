"use client";

import {
	CartesianGrid,
	ChartContainer,
	ChartTooltip,
	LiveLine,
	LiveLineChart,
	type LivePoint,
	LiveXAxis,
	LiveYAxis,
} from "@baby-ui/react";
import { type ComponentProps, useEffect, useRef, useState } from "react";
import { createLiveFeed, LIVE_CONFIG, LIVE_TICK_MS, numberProp } from "../data/live";
import { controlProps } from "../data/preview-props";

type Props = Record<string, unknown>;
const KEEP_SECONDS = 120;

export function LiveLineChartDemo({ props }: { props: Props }) {
	const pAxis = controlProps<ComponentProps<typeof LiveYAxis>>(props);
	const pLine = controlProps<ComponentProps<typeof LiveLine>>(props);
	const feed = useRef(createLiveFeed());
	const [data, setData] = useState<LivePoint[]>(() => feed.current.backfill(60));
	const paused = props.paused === true;

	useEffect(() => {
		if (paused) return;
		const id = window.setInterval(() => {
			const time = Date.now() / 1000;
			setData((prev) => [
				...prev.filter((p) => p.time > time - KEEP_SECONDS),
				{ time, value: feed.current.step() },
			]);
		}, LIVE_TICK_MS);
		return () => clearInterval(id);
	}, [paused]);

	return (
		<div className="w-full max-w-3xl">
			<ChartContainer config={LIVE_CONFIG} title="Live price">
				<LiveLineChart
					data={data}
					value={data.at(-1)?.value ?? 0}
					window={numberProp(props.window, 30)}
					paused={paused}
					exaggerate={props.exaggerate === true}
					nowOffsetUnits={numberProp(props.nowOffsetUnits, 0)}
					lerpSpeed={numberProp(props.lerpSpeed, 0.08)}
				>
					<CartesianGrid />
					<LiveYAxis position={pAxis.position ?? "left"} />
					<LiveXAxis />
					<LiveLine
						dataKey="value"
						curve={pLine.curve ?? "monotone"}
						tint={pLine.tint ?? "dot"}
						fill={props.fill !== false}
						pulse={props.pulse !== false}
						badge={props.badge !== false}
						guide={props.guide !== false}
					/>
					<ChartTooltip datePill={false} dots={false} />
				</LiveLineChart>
			</ChartContainer>
		</div>
	);
}
