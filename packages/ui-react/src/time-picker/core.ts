/** 24-hour "HH:mm", the same string an `<input type="time">` reads and writes. */
export type TimeValue = string;

export interface TimePickerLabels {
	group: string;
	hour: string;
	minute: string;
	period: string;
	empty: string;
}

export const TIME_PICKER_LABELS: TimePickerLabels = {
	group: "Time",
	hour: "Hour",
	minute: "Minute",
	period: "AM/PM",
	empty: "--",
};

export type TimeParts = { hour: number; minute: number };

export function parseTime(value: TimeValue | null | undefined): TimeParts | null {
	const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? "");
	if (!match) return null;
	const hour = Number(match[1]);
	const minute = Number(match[2]);
	return hour < 24 && minute < 60 ? { hour, minute } : null;
}

export function formatTime({ hour, minute }: TimeParts): TimeValue {
	return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

const wrap = (n: number, size: number) => ((n % size) + size) % size;

export function stepHour(parts: TimeParts, delta: number): TimeParts {
	return { ...parts, hour: wrap(parts.hour + delta, 24) };
}

/** Moves by `step` minutes and snaps onto the step grid, rolling the hour over. */
export function stepMinute(parts: TimeParts, delta: number, step: number): TimeParts {
	const total = parts.hour * 60 + parts.minute;
	const snapped =
		delta > 0
			? Math.floor(total / step) * step + step
			: Math.ceil(total / step) * step - step;
	const next = wrap(snapped, 24 * 60);
	return { hour: Math.floor(next / 60), minute: next % 60 };
}

export function togglePeriod(parts: TimeParts): TimeParts {
	return { ...parts, hour: wrap(parts.hour + 12, 24) };
}

/** The hour as shown: 1 to 12 in a 12-hour cycle, 0 to 23 otherwise. */
export function displayHour(hour: number, hourCycle: 12 | 24): number {
	if (hourCycle === 24) return hour;
	return hour % 12 === 0 ? 12 : hour % 12;
}

/** Applies a typed hour, keeping AM or PM in a 12-hour cycle. */
export function typedHour(
	parts: TimeParts,
	typed: number,
	hourCycle: 12 | 24,
): TimeParts {
	if (hourCycle === 24) return { ...parts, hour: Math.min(typed, 23) };
	const base = Math.min(Math.max(typed, 1), 12) % 12;
	return { ...parts, hour: parts.hour >= 12 ? base + 12 : base };
}

export function periodLabel(hour: number, locale?: string): string {
	const parts = new Intl.DateTimeFormat(locale, {
		hour: "numeric",
		hour12: true,
	}).formatToParts(new Date(2000, 0, 1, hour));
	return (
		parts.find((part) => part.type === "dayPeriod")?.value ?? (hour < 12 ? "AM" : "PM")
	);
}

/** The locale's own clock, so en-US gets 12-hour and en-GB 24-hour without a prop. */
export function localeHourCycle(locale?: string): 12 | 24 {
	const cycle = new Intl.DateTimeFormat(locale, { hour: "numeric" }).resolvedOptions()
		.hourCycle;
	return cycle === "h11" || cycle === "h12" ? 12 : 24;
}
