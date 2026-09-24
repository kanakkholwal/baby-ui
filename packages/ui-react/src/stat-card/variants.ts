import { tv, type VariantProps } from "tailwind-variants";

export const statCard = tv({
	slots: {
		root: "w-full gap-0 overflow-hidden py-0",
		header: "flex items-start justify-between gap-3 px-4 pt-3 pb-1",
		title: "font-medium text-muted-foreground text-sm",
		body: "flex flex-col gap-3 px-4 pb-0",
		headline: "flex flex-col gap-1",
		label: "text-muted-foreground text-xs",
		chart: "-mx-4 relative",
	},
	variants: {
		size: {
			sm: { chart: "h-24" },
			md: { chart: "h-48" },
			lg: { chart: "h-80" },
		},
		/** A bare line needs headroom so its stroke is not clipped at the card edge. */
		chart: {
			area: { chart: "pt-0" },
			line: { chart: "pt-2" },
		},
	},
	defaultVariants: { size: "md", chart: "area" },
});

export type StatCardSize = NonNullable<VariantProps<typeof statCard>["size"]>;
export type StatCardChartKind = NonNullable<VariantProps<typeof statCard>["chart"]>;

/** Period-over-period change in percent against the previous row; null when there is none. */
export function periodTrend(
	data: Record<string, unknown>[],
	index: number,
	dataKey: string,
): number | null {
	if (index <= 0) return null;
	const current = data[index]?.[dataKey];
	const previous = data[index - 1]?.[dataKey];
	if (typeof current !== "number" || typeof previous !== "number" || previous === 0)
		return null;
	return ((current - previous) / previous) * 100;
}
