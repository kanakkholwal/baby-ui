"use client";

import { useId, useMemo } from "react";
import { cn } from "../lib/cn";
import { useChart } from "./chart";
import { evenTickIndices, toDate } from "./core";
import { CHART_DURATION, CHART_EASE_CSS } from "./motion";
import { useActivePoint, usePlot } from "./time-series";
import { type ChartGridVariant, chartAxis, chartGrid } from "./variants";

const slide = `transform ${CHART_DURATION.update}ms ${CHART_EASE_CSS}`;

export interface CartesianGridProps {
	variant?: ChartGridVariant;
	horizontal?: boolean;
	vertical?: boolean;
	/** Tick-count hint for rows; d3 may return a nearby count. */
	rows?: number;
	columns?: number;
	/** Fade row ends into the plot edges. */
	fade?: boolean;
	className?: string;
}

export function CartesianGrid({
	variant = "dashed",
	horizontal = true,
	vertical = false,
	rows = 5,
	columns = 10,
	fade = true,
	className,
}: CartesianGridProps) {
	const { yScale, xScale, innerWidth, innerHeight } = usePlot();
	const maskId = `${useId().replace(/:/g, "")}-grid-fade`;
	const line = cn(chartGrid({ variant }), className);
	return (
		<g data-slot="chart-grid">
			{horizontal && fade ? (
				<defs>
					<linearGradient id={`${maskId}-g`} x1="0%" x2="100%" y1="0%" y2="0%">
						<stop offset="0%" stopColor="white" stopOpacity={0} />
						<stop offset="10%" stopColor="white" stopOpacity={1} />
						<stop offset="90%" stopColor="white" stopOpacity={1} />
						<stop offset="100%" stopColor="white" stopOpacity={0} />
					</linearGradient>
					<mask id={maskId}>
						<rect width={innerWidth} height={innerHeight} fill={`url(#${maskId}-g)`} />
					</mask>
				</defs>
			) : null}
			{horizontal ? (
				<g mask={fade ? `url(#${maskId})` : undefined}>
					{yScale.ticks(rows).map((tick) => (
						<line
							key={tick}
							className={line}
							x1={0}
							x2={innerWidth}
							y1={0}
							y2={0}
							style={{ transform: `translateY(${yScale(tick)}px)`, transition: slide }}
						/>
					))}
				</g>
			) : null}
			{vertical
				? xScale
						.ticks(columns)
						.map((tick) => (
							<line
								key={tick.getTime()}
								className={line}
								x1={xScale(tick)}
								x2={xScale(tick)}
								y1={0}
								y2={innerHeight}
							/>
						))
				: null}
		</g>
	);
}

export interface YAxisProps {
	/** Tick-count hint; d3 may return a nearby count. */
	tickCount?: number;
	tickFormatter?: (value: number) => string;
	orientation?: "left" | "right";
	tickLine?: boolean;
	className?: string;
}

export function YAxis({
	tickCount = 5,
	tickFormatter,
	orientation = "left",
	tickLine = false,
	className,
}: YAxisProps) {
	const { format } = useChart();
	const { yScale, innerWidth } = usePlot();
	const styles = chartAxis({ tickLine });
	const left = orientation === "left";
	const ticks = yScale.ticks(Math.min(10, Math.max(2, tickCount)));
	return (
		<g data-slot="chart-y-axis" className={className}>
			{ticks.map((tick) => (
				<g
					key={tick}
					style={{
						transform: `translate(${left ? 0 : innerWidth}px, ${yScale(tick)}px)`,
						transition: slide,
					}}
				>
					<line className={styles.line()} x1={left ? -4 : 0} x2={left ? 0 : 4} />
					<text
						className={styles.tick()}
						x={left ? -8 : 8}
						dominantBaseline="middle"
						textAnchor={left ? "end" : "start"}
					>
						{tickFormatter ? tickFormatter(tick) : format.compact(tick)}
					</text>
				</g>
			))}
		</g>
	);
}

export interface XAxisProps {
	tickCount?: number;
	tickFormatter?: (date: Date) => string;
	tickLine?: boolean;
	/** Labels within this many px of the crosshair fade out so the date pill can read. */
	clearance?: number;
	className?: string;
}

export function XAxis({
	tickCount = 5,
	tickFormatter,
	tickLine = false,
	clearance = 50,
	className,
}: XAxisProps) {
	const { data, xKey, x, labels, innerHeight, margin } = usePlot();
	const { active } = useActivePoint();
	const styles = chartAxis({ tickLine });
	const indices = useMemo(
		() =>
			evenTickIndices(
				data.length,
				tickCount,
				(i) => (data[i] ? x(data[i]) : i),
				(i) => labels[i] ?? "",
			),
		[data, tickCount, x, labels],
	);
	const fadeBuffer = 20;
	return (
		<g data-slot="chart-x-axis" className={className}>
			{indices.map((index) => {
				const datum = data[index];
				if (!datum) return null;
				const px = x(datum);
				let opacity = 1;
				if (active) {
					const distance = Math.abs(px - active.x);
					if (distance < clearance || index === active.index) opacity = 0;
					else if (distance < clearance + fadeBuffer)
						opacity = (distance - clearance) / fadeBuffer;
				}
				const date = toDate(datum[xKey]);
				return (
					<g
						key={date.getTime()}
						style={{
							transform: `translate(${px}px, ${innerHeight}px)`,
							transition: slide,
						}}
					>
						<line className={styles.line()} y2={4} />
						<text
							className={styles.tick()}
							y={margin.bottom - 12}
							textAnchor="middle"
							style={{
								opacity,
								transition: "opacity 400ms cubic-bezier(0.42, 0, 0.58, 1)",
							}}
						>
							{tickFormatter ? tickFormatter(date) : labels[index]}
						</text>
					</g>
				);
			})}
		</g>
	);
}
