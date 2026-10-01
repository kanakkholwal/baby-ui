"use client";

import { useMemo } from "react";
import {
	type Draft,
	draftToTime,
	fieldLayout,
	localeHourCycle,
	timeToDraft,
} from "../date-field/core";
import { DateSegments, useFieldDraft } from "../date-field/segments";
import { dateField } from "../date-field/variants";
import { cn } from "../lib/cn";
import {
	formatTime,
	parseTime,
	TIME_PICKER_LABELS,
	type TimePickerLabels,
	type TimeValue,
} from "./core";
import type { TimePickerSize } from "./variants";

export type { TimePickerLabels, TimePickerSize, TimeValue };

export interface TimePickerProps {
	/** 24-hour "HH:mm", or `null` while empty or half typed. */
	value: TimeValue | null;
	onValueChange: (value: TimeValue | null) => void;
	/** Defaults to the locale's own clock. */
	hourCycle?: 12 | 24;
	/** Minutes moved per arrow press; typed minutes are not snapped. */
	step?: number;
	locale?: string;
	disabled?: boolean;
	/** Marks the field invalid from outside, e.g. a form error. */
	invalid?: boolean;
	size?: TimePickerSize;
	labels?: Partial<TimePickerLabels>;
	id?: string;
	/** Submits the time as "HH:mm". */
	name?: string;
	"aria-label"?: string;
	"aria-describedby"?: string;
	className?: string;
}

/** Segmented hour and minute (plus AM/PM on a 12-hour clock), typed or stepped with the arrows. */
export function TimePicker({
	value,
	onValueChange,
	hourCycle: hourCycleProp,
	step = 1,
	locale,
	disabled = false,
	invalid = false,
	size = "md",
	labels: labelsProp,
	id,
	name,
	"aria-label": ariaLabel,
	"aria-describedby": describedBy,
	className,
}: TimePickerProps) {
	const labels = { ...TIME_PICKER_LABELS, ...labelsProp };
	const hourCycle = hourCycleProp ?? localeHourCycle(locale);
	const s = dateField({ size });
	const layout = useMemo(
		() => fieldLayout("time", locale, hourCycle),
		[locale, hourCycle],
	);
	const [draft, setDraft] = useFieldDraft<TimeValue, Draft>(
		parseTime(value) ? value : null,
		(time) => time,
		(time) => timeToDraft(parseTime(time), hourCycle),
		(next) => {
			const time = draftToTime(next, hourCycle);
			return time ? formatTime(time) : null;
		},
		onValueChange,
	);

	return (
		<fieldset
			id={id}
			aria-label={ariaLabel ?? labels.group}
			aria-describedby={describedBy}
			aria-disabled={disabled || undefined}
			aria-invalid={invalid || undefined}
			data-slot="time-picker"
			className={cn(s.group(), "w-fit", className)}
		>
			<span className={s.icon()}>
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
			</span>
			<DateSegments
				layout={layout}
				draft={draft}
				onDraftChange={setDraft}
				labels={{
					year: "",
					month: "",
					day: "",
					hour: labels.hour,
					minute: labels.minute,
					dayPeriod: labels.period,
				}}
				placeholders={{
					year: "",
					month: "",
					day: "",
					hour: labels.empty,
					minute: labels.empty,
					dayPeriod: "",
				}}
				hourCycle={hourCycle}
				step={step}
				locale={locale}
				disabled={disabled}
				invalid={invalid}
				className={s.input()}
				segmentClassName={s.segment()}
			/>
			{name ? <input type="hidden" name={name} value={value ?? ""} /> : null}
		</fieldset>
	);
}
