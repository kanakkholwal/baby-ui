"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "../chart/chart";
import type { Datum } from "../chart/core";
import { cn } from "../lib/cn";
import { RingChart } from "../ring-chart/ring-chart";
import type { RingCap } from "../ring-chart/variants";
import { type UsageCardLayout, usageCard } from "./variants";

export type { UsageCardLayout };

export interface UsageCardProps {
	title: string;
	description?: string;
	data: Datum[];
	/** Label and colour per ring, keyed by `nameKey`. */
	config: ChartConfig;
	/** Key holding each ring's value. */
	dataKey?: string;
	/** Key holding each ring's maximum; missing or non-positive maxima count as 100. */
	maxKey?: string;
	/** Key holding each ring's name; matches `config` keys. */
	nameKey?: string;
	layout?: UsageCardLayout;
	cap?: RingCap;
	centerLabel?: string;
	locale?: string;
	activeIndex?: number | null;
	onActiveIndexChange?: (index: number | null) => void;
	className?: string;
}

/** A settings-page usage panel: one ring per metric (storage, seats, calls, ...) with a legend. */
export function UsageCard({
	title,
	description,
	data,
	config,
	dataKey = "value",
	maxKey = "max",
	nameKey = "name",
	layout = "side",
	cap = "round",
	centerLabel,
	locale,
	activeIndex,
	onActiveIndexChange,
	className,
}: UsageCardProps) {
	const styles = usageCard({ layout });

	return (
		<Card data-slot="usage-card" className={cn(styles.root(), className)}>
			<CardHeader className={styles.header()}>
				<CardTitle className={styles.title()}>{title}</CardTitle>
				{description ? (
					<CardDescription className={styles.description()}>
						{description}
					</CardDescription>
				) : null}
			</CardHeader>
			<CardContent className={styles.body()}>
				<ChartContainer
					config={config}
					title={title}
					aspect="auto"
					locale={locale}
					className={styles.chart()}
				>
					<RingChart
						data={data}
						dataKey={dataKey}
						maxKey={maxKey}
						nameKey={nameKey}
						cap={cap}
						centerLabel={centerLabel}
						activeIndex={activeIndex}
						onActiveIndexChange={onActiveIndexChange}
						className={styles.plot()}
					/>
					<ChartLegend
						content={<ChartLegendContent align="start" className={styles.legend()} />}
					/>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
