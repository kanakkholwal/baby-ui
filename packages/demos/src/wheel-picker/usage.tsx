"use client";

import { WheelPicker, WheelPickerColumn } from "@baby-ui/react";

export function Example() {
	return (
		<WheelPicker aria-label="Time">
			<WheelPickerColumn
				options={["9", "10", "11"]}
				defaultValue="10"
				aria-label="Hour"
			/>
			<WheelPickerColumn options={["AM", "PM"]} defaultValue="AM" aria-label="Period" />
		</WheelPicker>
	);
}
