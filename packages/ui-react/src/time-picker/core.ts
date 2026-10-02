/** 24-hour "HH:mm", the same string an `<input type="time">` reads and writes. */
export type TimeValue = string;

export interface TimePickerLabels {
	group: string;
	hour: string;
	minute: string;
	period: string;
	empty: string;
	/** Aria for the X button that resets the field to null. */
	clear: string;
	/** Visible label and aria for the quick "set to now" button. */
	now: string;
	/** Field-level error when the value falls outside `min` / `max`. */
	outOfRange: string;
}

export const TIME_PICKER_LABELS: TimePickerLabels = {
	group: "Time",
	hour: "Hour",
	minute: "Minute",
	period: "AM/PM",
	empty: "––",
	clear: "Clear time",
	now: "Now",
	outOfRange: "Pick a time inside the allowed range.",
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

const compare = (a: TimeParts, b: TimeParts) => a.hour - b.hour || a.minute - b.minute;

/** True when `value` is outside `[min, max]`. Either bound may be missing. */
export function timeOutOfRange(
	value: TimeValue | null,
	min: TimeValue | undefined,
	max: TimeValue | undefined,
): boolean {
	const parts = parseTime(value);
	if (!parts) return false;
	const lo = parseTime(min);
	const hi = parseTime(max);
	if (lo && compare(parts, lo) < 0) return true;
	if (hi && compare(parts, hi) > 0) return true;
	return false;
}

/** Local-now formatted as `HH:mm`, for the optional quick-set button. */
export function nowAsTimeValue(now = new Date()): TimeValue {
	return formatTime({ hour: now.getHours(), minute: now.getMinutes() });
}
