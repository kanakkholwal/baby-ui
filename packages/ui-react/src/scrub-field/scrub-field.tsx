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
	const s = scrubField({ size, tone });

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
			className={cn(s.root(), className)}
		>
			<NumberFieldPrimitive.ScrubArea className={s.label()}>
				{label}
				<svg viewBox="0 0 16 16" fill="none" aria-hidden className={s.grip()}>
					<path
						d="M5 4.5 1.5 8 5 11.5M11 4.5 14.5 8 11 11.5"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</NumberFieldPrimitive.ScrubArea>
			<NumberFieldPrimitive.Input aria-label={`${label} value`} className={s.input()} />
			{suffix ? <span className={s.suffix()}>{suffix}</span> : null}
		</NumberFieldPrimitive.Root>
	);
}
