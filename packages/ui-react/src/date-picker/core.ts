/** A calendar day without a time or zone: React converts to `Date`, Svelte to `CalendarDate`. */
export type DateParts = { year: number; month: number; day: number };

export interface DatePickerLabels {
	placeholder: string;
	choose: string;
	clear: string;
	/** `{example}` is replaced with today in the locale's numeric format. */
	invalid: string;
	outOfRange: string;
}

export const DATE_PICKER_LABELS: DatePickerLabels = {
	placeholder: "Pick a date",
	choose: "Choose date",
	clear: "Clear date",
	invalid: "Enter a date like {example}.",
	outOfRange: "Pick a date inside the allowed range.",
};

const FIELDS = ["year", "month", "day"] as const;
type Field = (typeof FIELDS)[number];

/** Field order of the locale's numeric date, e.g. month, day, year for en-US. */
export function dateOrder(locale?: string): Field[] {
	return new Intl.DateTimeFormat(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	})
		.formatToParts(new Date(2006, 10, 22))
		.map((part) => part.type)
		.filter((type): type is Field => (FIELDS as readonly string[]).includes(type));
}

function isReal({ year, month, day }: DateParts): boolean {
	const date = new Date(year, month - 1, day);
	return (
		date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day
	);
}

/** Reads typed dates: numeric in the locale's order, ISO, or a month name. Null when invalid. */
export function parseDateInput(text: string, locale?: string): DateParts | null {
	const value = text.trim();
	if (!value) return null;
	const numbers = value
		.split(/[^0-9]+/)
		.filter(Boolean)
		.map(Number);
	if (/^[0-9\s./-]+$/.test(value) && numbers.length === 3) {
		const order: Field[] = /^\d{4}/.test(value)
			? ["year", "month", "day"]
			: dateOrder(locale);
		const parts = { year: 0, month: 0, day: 0 };
		order.forEach((field, i) => {
			parts[field] = numbers[i] ?? 0;
		});
		if (parts.year < 100) parts.year += 2000;
		return isReal(parts) ? parts : null;
	}
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return null;
	return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
}

export function formatDateParts(
	parts: DateParts,
	locale?: string,
	options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
): string {
	return new Intl.DateTimeFormat(locale, options).format(
		new Date(parts.year, parts.month - 1, parts.day),
	);
}

export function compareDateParts(a: DateParts, b: DateParts): number {
	return a.year - b.year || a.month - b.month || a.day - b.day;
}

export function isOutsideRange(
	parts: DateParts,
	min?: DateParts,
	max?: DateParts,
): boolean {
	return (
		(min !== undefined && compareDateParts(parts, min) < 0) ||
		(max !== undefined && compareDateParts(parts, max) > 0)
	);
}

/** The invalid-date hint, with today spelled in the locale's numeric format. */
export function invalidDateMessage(labels: DatePickerLabels, locale?: string): string {
	const today = new Date();
	const example = formatDateParts(
		{ year: today.getFullYear(), month: today.getMonth() + 1, day: today.getDate() },
		locale,
		{ year: "numeric", month: "2-digit", day: "2-digit" },
	);
	return labels.invalid.replace("{example}", example);
}
