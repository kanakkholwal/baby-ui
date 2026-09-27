"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import { cn } from "../lib/cn";
import {
	displayHour,
	formatTime,
	localeHourCycle,
	parseTime,
	periodLabel,
	stepHour,
	stepMinute,
	TIME_PICKER_LABELS,
	type TimeParts,
	type TimePickerLabels,
	type TimeValue,
	togglePeriod,
	typedHour,
} from "./core";
import { type TimePickerSize, timePicker } from "./variants";

export type { TimePickerLabels, TimePickerSize, TimeValue };

export interface TimePickerProps {
	/** 24-hour "HH:mm", or `null` when empty. */
	value: TimeValue | null;
	onValueChange: (value: TimeValue | null) => void;
	/** Defaults to the locale's own clock. */
	hourCycle?: 12 | 24;
	/** Minutes moved per arrow press; typed minutes are not snapped. */
	step?: number;
	locale?: string;
	disabled?: boolean;
	size?: TimePickerSize;
	labels?: Partial<TimePickerLabels>;
	id?: string;
	"aria-label"?: string;
	className?: string;
}

type Segment = "hour" | "minute" | "period";

/** Hour and minute spinbuttons (plus AM/PM on a 12-hour clock), stepped by keyboard or typed. */
export function TimePicker({
	value,
	onValueChange,
	hourCycle: hourCycleProp,
	step = 1,
	locale,
	disabled = false,
	size = "md",
	labels: labelsProp,
	id,
	"aria-label": ariaLabel,
	className,
}: TimePickerProps) {
	const labels = { ...TIME_PICKER_LABELS, ...labelsProp };
	const hourCycle = hourCycleProp ?? localeHourCycle(locale);
	const s = timePicker({ size });
	const parts = parseTime(value);
	const refs = useRef<Record<Segment, HTMLSpanElement | null>>({
		hour: null,
		minute: null,
		period: null,
	});
	// The first typed digit of a segment waits here for the second.
	const [pending, setPending] = useState<{ segment: Segment; digit: number } | null>(
		null,
	);

	const segments: Segment[] =
		hourCycle === 12 ? ["hour", "minute", "period"] : ["hour", "minute"];
	const focus = (segment: Segment | undefined) =>
		segment && refs.current[segment]?.focus();
	const neighbour = (segment: Segment, delta: number) =>
		segments[segments.indexOf(segment) + delta];

	const base = (): TimeParts => {
		if (parts) return parts;
		const now = new Date();
		return { hour: now.getHours(), minute: now.getMinutes() };
	};
	const emit = (next: TimeParts) => onValueChange(formatTime(next));

	function onKeyDown(segment: Segment, event: KeyboardEvent<HTMLSpanElement>) {
		if (disabled) return;
		const key = event.key;
		const move = (delta: number) =>
			emit(
				segment === "hour"
					? stepHour(base(), delta)
					: segment === "minute"
						? stepMinute(base(), delta, step)
						: togglePeriod(base()),
			);
		if (key === "ArrowUp" || key === "ArrowDown") {
			event.preventDefault();
			setPending(null);
			move(key === "ArrowUp" ? 1 : -1);
		} else if (key === "ArrowLeft" || key === "ArrowRight") {
			event.preventDefault();
			setPending(null);
			focus(neighbour(segment, key === "ArrowLeft" ? -1 : 1));
		} else if (key === "Backspace" || key === "Delete") {
			event.preventDefault();
			setPending(null);
			onValueChange(null);
		} else if (segment === "period" && /^[ap]$/i.test(key)) {
			event.preventDefault();
			const current = base();
			const pm = key.toLowerCase() === "p";
			if (pm !== current.hour >= 12) emit(togglePeriod(current));
		} else if (/^\d$/.test(key) && segment !== "period") {
			event.preventDefault();
			typeDigit(segment, Number(key));
		}
	}

	function typeDigit(segment: "hour" | "minute", digit: number) {
		const current = base();
		const first = pending?.segment === segment ? pending.digit : null;
		const typed = first === null ? digit : first * 10 + digit;
		const limit = segment === "hour" ? (hourCycle === 12 ? 1 : 2) : 5;
		const next =
			segment === "hour"
				? typedHour(current, typed, hourCycle)
				: { ...current, minute: Math.min(typed, 59) };
		emit(next);
		// A second digit, or a first digit that can't start a two-digit value, completes the segment.
		if (first !== null || digit > limit) {
			setPending(null);
			focus(neighbour(segment, 1));
		} else {
			setPending({ segment, digit });
		}
	}

	const text = (segment: Segment) => {
		if (!parts) return labels.empty;
		if (segment === "hour")
			return String(displayHour(parts.hour, hourCycle)).padStart(2, "0");
		if (segment === "minute") return String(parts.minute).padStart(2, "0");
		return periodLabel(parts.hour, locale);
	};

	const spin = (segment: Segment) => {
		const max =
			segment === "hour" ? (hourCycle === 12 ? 12 : 23) : segment === "minute" ? 59 : 1;
		const min = segment === "hour" && hourCycle === 12 ? 1 : 0;
		const now =
			parts &&
			(segment === "hour"
				? displayHour(parts.hour, hourCycle)
				: segment === "minute"
					? parts.minute
					: parts.hour >= 12
						? 1
						: 0);
		return (
			<span
				key={segment}
				ref={(el) => {
					refs.current[segment] = el;
				}}
				role="spinbutton"
				tabIndex={disabled ? -1 : 0}
				aria-label={labels[segment]}
				aria-valuemin={min}
				aria-valuemax={max}
				aria-valuenow={now ?? undefined}
				aria-valuetext={parts ? text(segment) : labels.empty}
				aria-disabled={disabled || undefined}
				data-empty={parts ? undefined : ""}
				onKeyDown={(e) => onKeyDown(segment, e)}
				onBlur={() => setPending(null)}
				className={cn(s.segment(), segment === "period" && s.period())}
			>
				{text(segment)}
			</span>
		);
	};

	return (
		<fieldset
			id={id}
			aria-label={ariaLabel ?? labels.group}
			aria-disabled={disabled || undefined}
			data-slot="time-picker"
			className={cn(s.root(), className)}
		>
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3 3" />
			</svg>
			{spin("hour")}
			<span aria-hidden="true" className={s.separator()}>
				:
			</span>
			{spin("minute")}
			{hourCycle === 12 ? spin("period") : null}
		</fieldset>
	);
}
