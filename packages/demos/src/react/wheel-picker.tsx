"use client";

import { WheelPicker, WheelPickerColumn, type WheelPickerRows } from "@baby-ui/react";

type Props = Record<string, unknown>;

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const PERIODS = ["AM", "PM"];

export function WheelPickerDemo({ props }: { props: Props }) {
	const rows = (props.rows as WheelPickerRows) ?? "5";
	const itemHeight = Number(props.itemHeight ?? 44);
	return (
		<WheelPicker
			key={`${rows}-${itemHeight}`}
			rows={rows}
			itemHeight={itemHeight}
			lens={props.lens !== false}
			aria-label="Time"
			className="w-64 rounded-2xl border bg-card p-2"
		>
			<WheelPickerColumn
				options={HOURS}
				defaultValue="9"
				loop={props.loop === true}
				disabled={props.disabled === true}
				aria-label="Hour"
			/>
			<WheelPickerColumn
				options={MINUTES}
				defaultValue="41"
				loop={props.loop === true}
				disabled={props.disabled === true}
				aria-label="Minute"
			/>
			<WheelPickerColumn options={PERIODS} defaultValue="AM" aria-label="Period" />
		</WheelPicker>
	);
}
