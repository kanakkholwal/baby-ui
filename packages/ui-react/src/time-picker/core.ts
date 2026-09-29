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
	empty: "––",
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
