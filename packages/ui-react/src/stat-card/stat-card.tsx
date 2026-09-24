"use client";

import { type ReactNode, useMemo, useState } from "react";
import { Area, AreaChart } from "../area-chart/area-chart";
import { Badge } from "../badge/badge";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../card/card";
import { ChartContainer } from "../chart/chart";
import { type ChartStatus, type Datum, toDate } from "../chart/core";
import { Counter } from "../counter/counter";
import { cn } from "../lib/cn";
import { Line, LineChart } from "../line-chart/line-chart";
import {
	periodTrend,
	type StatCardChartKind,
	type StatCardSize,
	statCard,
} from "./variants";

export type { StatCardChartKind, StatCardSize };

export interface StatCardProps {
	/** Card heading; also the chart's accessible name. */
	title: string;
	data: Datum[];
	dataKey: string;
	xKey?: string;
	/** Headline at rest, e.g. the period average. */
	value: number;
	/** Caption under the headline at rest, e.g. "Avg". */
	label: string;
	/** Change over the whole period, in percent. */
	trend: number;
	chart?: StatCardChartKind;
	size?: StatCardSize;
	/** Series colour; defaults to the first chart slot. */
	color?: string;
	locale?: string;
	formatValue?: (value: number) => string;
	/** Caption for a hovered row. Defaults to the row's short month. */
	formatLabel?: (date: Date) => string;
	status?: ChartStatus;
	activeIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	className?: string;
	children?: ReactNode;
}

/** bklit's stat card: the headline, caption and trend follow whichever point the chart has active. */
export function StatCard({
	title,
	data,
	dataKey,
	xKey = "date",
	value,
	label,
	trend,
	chart = "area",
	size = "md",
	color = "var(--chart-1)",
	locale,
	formatValue,
	formatLabel,
	status = "ready",
	activeIndex: activeIndexProp,
	onActiveIndexChange,
	className,
	children,
}: StatCardProps) {
	const [internal, setInternal] = useState<number | null>(null);
	const activeIndex = activeIndexProp !== undefined ? activeIndexProp : internal;
	const setActive = (index: number | null) => {
		if (activeIndexProp === undefined) setInternal(index);
		onActiveIndexChange?.(index);
	};
	const number = useMemo(
		() =>
			formatValue ?? new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format,
		[formatValue, locale],
	);
	const month = useMemo(
		() => new Intl.DateTimeFormat(locale, { month: "short" }),
		[locale],
	);
	const percent = useMemo(
		() =>
			new Intl.NumberFormat(locale, {
				style: "percent",
				maximumFractionDigits: 1,
				signDisplay: "exceptZero",
			}),
		[locale],
	);

	const datum = activeIndex !== null ? data[activeIndex] : undefined;
	const hovered = datum?.[dataKey];
	const shownValue = typeof hovered === "number" ? hovered : value;
	const shownLabel = datum
		? (formatLabel ?? ((d: Date) => month.format(d)))(toDate(datum[xKey]))
		: label;
	const shownTrend =
		(datum ? periodTrend(data, activeIndex ?? 0, dataKey) : null) ?? trend;
	const up = shownTrend >= 0;
	const styles = statCard({ size, chart });
	const config = { [dataKey]: { label: title, color } };
	const margin = { top: 4, right: 0, bottom: 0, left: 0 };

	return (
		<Card data-slot="stat-card" className={cn(styles.root(), className)}>
			<CardHeader className={styles.header()}>
				<CardTitle className={styles.title()}>{title}</CardTitle>
				<CardAction>
					<Badge variant={up ? "success" : "destructive"} size="sm">
						<svg aria-hidden="true" viewBox="0 0 12 12" className="size-3" fill="none">
							<path
								d={up ? "M3 9 9 3M4.5 3H9v4.5" : "M3 3l6 6M9 4.5V9H4.5"}
								stroke="currentColor"
								strokeWidth={1.5}
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						{percent.format(shownTrend / 100)}
					</Badge>
				</CardAction>
			</CardHeader>
			<CardContent className={styles.body()}>
				<div className={styles.headline()}>
					<Counter
						value={shownValue}
						format={number}
						size="sm"
						durationMs={400}
						triggerOnView={false}
					/>
					<span className={styles.label()}>{shownLabel}</span>
				</div>
				<div className={styles.chart()}>
					<ChartContainer config={config} title={title} aspect="auto" locale={locale}>
						{chart === "line" ? (
							<LineChart
								data={data}
								xKey={xKey}
								margin={margin}
								status={status}
								activeIndex={activeIndex}
								onActiveIndexChange={setActive}
							>
								<Line dataKey={dataKey} curve="monotone" strokeWidth={2} />
								{children}
							</LineChart>
						) : (
							<AreaChart
								data={data}
								xKey={xKey}
								margin={margin}
								status={status}
								activeIndex={activeIndex}
								onActiveIndexChange={setActive}
							>
								<Area dataKey={dataKey} curve="monotone" fillOpacity={0.45} />
								{children}
							</AreaChart>
						)}
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
}
