/** A calendar day without a time or zone: React converts to `Date`, Svelte to `CalendarDate`. */
export type RangeDateParts = { year: number; month: number; day: number };
export type DateRangeParts = { from: RangeDateParts; to: RangeDateParts };

export type DateRangePreset = {
	label: string;
	/** Builds the range from today, so presets stay right across midnight. */
	range: (today: RangeDateParts) => DateRangeParts;
};

export interface DateRangePickerLabels {
	placeholder: string;
	presets: string;
	apply: string;
	cancel: string;
}

export const DATE_RANGE_PICKER_LABELS: DateRangePickerLabels = {
	placeholder: "Pick a date range",
	presets: "Quick ranges",
	apply: "Apply",
	cancel: "Cancel",
};

export function addDays(parts: RangeDateParts, days: number): RangeDateParts {
	const date = new Date(parts.year, parts.month - 1, parts.day + days);
	return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

export const DEFAULT_RANGE_PRESETS: DateRangePreset[] = [
	{ label: "Today", range: (today) => ({ from: today, to: today }) },
	{ label: "Last 7 days", range: (today) => ({ from: addDays(today, -6), to: today }) },
	{
		label: "This month",
		range: (today) => ({ from: { ...today, day: 1 }, to: today }),
	},
	{ label: "Last 30 days", range: (today) => ({ from: addDays(today, -29), to: today }) },
];

export function todayParts(now: Date = new Date()): RangeDateParts {
	return { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
}

const toDate = (p: RangeDateParts) => new Date(p.year, p.month - 1, p.day);

/** "Mar 3 to 12" in the locale's own range style; one date when both ends match. */
export function formatDateRange(range: DateRangeParts, locale?: string): string {
	const format = new Intl.DateTimeFormat(locale, { month: "short", day: "numeric" });
	return format.formatRange(toDate(range.from), toDate(range.to));
}

export function sameRange(
	a: DateRangeParts | null | undefined,
	b: DateRangeParts,
): boolean {
	if (!a) return false;
	const eq = (x: RangeDateParts, y: RangeDateParts) =>
		x.year === y.year && x.month === y.month && x.day === y.day;
	return eq(a.from, b.from) && eq(a.to, b.to);
}
