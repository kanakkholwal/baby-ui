"use client";

import { useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useChart } from "../chart/chart";
import {
	type FadeEdges,
	fadeStops,
	interpolatePoints,
	linePath,
	type PathPoint,
	seriesColor,
	seriesPoints,
	seriesVisibleInPhase,
	toDate,
} from "../chart/core";
import { CHART_DURATION, tween } from "../chart/motion";
import {
	TimeSeriesChart,
	type TimeSeriesChartProps,
	useActivePoint,
	usePlot,
} from "../chart/time-series";
import { cn } from "../lib/cn";
import { LINE_CURVES, type LineCurve, type LineVariant, line } from "./variants";

export interface LineChartProps extends TimeSeriesChartProps {
	/** Announced after the chart's name, e.g. "line chart". */
	roleDescription?: string;
}

export function LineChart({ roleDescription = "line chart", ...props }: LineChartProps) {
	return <TimeSeriesChart roleDescription={roleDescription} {...props} />;
}

export interface LineProps {
	dataKey: string;
	/** Defaults to the series colour from the chart config, `var(--color-<dataKey>)`. */
	stroke?: string;
	strokeWidth?: number;
	curve?: LineCurve;
	variant?: LineVariant;
	/** Fade the stroke into the plot edges. */
	fadeEdges?: FadeEdges;
	className?: string;
}

export function Line({
	dataKey,
	stroke,
	strokeWidth = 2.5,
	curve = "natural",
	variant = "solid",
	fadeEdges = true,
	className,
}: LineProps) {
	const { register, data, x, xKey, xScale, yScale, innerWidth, phase, animate, clipId } =
		usePlot();
	const { active } = useActivePoint();
	const { hidden, highlighted } = useChart();
	const gradientId = `${useId().replace(/:/g, "")}-line`;
	const color = stroke ?? seriesColor(dataKey);

	useLayoutEffect(() => register({ key: dataKey, color }), [register, dataKey, color]);

	const target = useMemo(
		() => seriesPoints(data, dataKey, x, (v) => yScale(v), xKey),
		[data, dataKey, x, yScale, xKey],
	);

	// Data, width and x-domain changes morph; y-domain moves are already tweened by the plot.
	const signature = `${innerWidth}|${xScale.domain().map(Number).join(",")}|${data
		.map((d) => `${toDate(d[xKey]).getTime()}:${String(d[dataKey])}`)
		.join(",")}`;
	const [progress, setProgress] = useState(1);
	const from = useRef<PathPoint[]>([]);
	const shown = useRef<PathPoint[]>(target);
	const prevSignature = useRef(signature);
	const phaseRef = useRef(phase);
	phaseRef.current = phase;
	useLayoutEffect(() => {
		if (prevSignature.current === signature) return;
		prevSignature.current = signature;
		if (phaseRef.current !== "ready" || !animate) {
			setProgress(1);
			return;
		}
		from.current = shown.current;
		setProgress(0);
		const playback = tween({ duration: CHART_DURATION.update, onUpdate: setProgress });
		return () => playback.stop();
	}, [signature, animate]);

	const points =
		progress >= 1 ? target : interpolatePoints(from.current, target, progress);
	shown.current = points;

	const isHidden = hidden.has(dataKey);
	const dimmed = active !== null || (highlighted !== null && highlighted !== dataKey);
	const drawn = seriesVisibleInPhase(phase);
	const fade = fadeEdges !== false;

	return (
		<g data-slot="chart-line" data-series={dataKey} clipPath={`url(#${clipId})`}>
			{fade ? (
				<defs>
					<linearGradient
						id={gradientId}
						gradientUnits="userSpaceOnUse"
						x1={0}
						x2={innerWidth}
						y1={0}
						y2={0}
					>
						{fadeStops(fadeEdges).map((stop) => (
							<stop
								key={stop.offset}
								offset={stop.offset}
								stopColor={color}
								stopOpacity={stop.opacity}
							/>
						))}
					</linearGradient>
				</defs>
			) : null}
			<path
				d={linePath(points, LINE_CURVES[curve])}
				className={cn(line({ curve, variant }), className)}
				stroke={drawn ? (fade ? `url(#${gradientId})` : color) : "transparent"}
				strokeWidth={strokeWidth}
				style={{ opacity: isHidden ? 0 : dimmed ? 0.3 : 1 }}
			/>
		</g>
	);
}
