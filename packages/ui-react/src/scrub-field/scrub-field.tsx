"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { cn } from "../lib/cn";
import { type ScrubFieldSize, type ScrubFieldTone, scrubField } from "./variants";

export type { ScrubFieldSize, ScrubFieldTone };

export interface ScrubFieldProps {
	/** Doubles as the accessible name and the draggable scrub handle. */
	label: string;
	value?: number;
	defaultValue?: number;
	onValueChange?: (value: number) => void;
	min?: number;
	max?: number;
	step?: number;
	/** Step size while holding Shift. */
	largeStep?: number;
	suffix?: string;
	size?: ScrubFieldSize;
	/** `edited` is a visual hook for callers tracking a changed-from-default state; this component never computes it itself. */
	tone?: ScrubFieldTone;
	disabled?: boolean;
	className?: string;
}

/** A number input whose label is a horizontal scrub handle (drag, or arrow keys, Shift for ×10). */
export function ScrubField({
	label,
	value,
	defaultValue,
	onValueChange,
	min,
	max,
	step = 1,
	largeStep = 10,
	suffix,
	size = "md",
	tone = "default",
	disabled = false,
	className,
}: ScrubFieldProps) {
	const {
		root,
		label: labelClass,
		input,
		suffix: suffixClass,
	} = scrubField({ size, tone });

	return (
		<NumberFieldPrimitive.Root
			data-slot="scrub-field"
			value={value}
			defaultValue={defaultValue}
			onValueChange={(next) => {
				if (next !== null) onValueChange?.(next);
			}}
			min={min}
			max={max}
			step={step}
			largeStep={largeStep}
			allowWheelScrub
			disabled={disabled}
			className={cn(root(), className)}
		>
			<NumberFieldPrimitive.ScrubArea className={labelClass()}>
				{label}
			</NumberFieldPrimitive.ScrubArea>
			<NumberFieldPrimitive.Input aria-label={`${label} value`} className={input()} />
			{suffix ? <span className={suffixClass()}>{suffix}</span> : null}
		</NumberFieldPrimitive.Root>
	);
}
