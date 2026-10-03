"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useId } from "react";
import { cn } from "../lib/cn";
import { type NumberInputSize, type NumberInputVariant, numberInput } from "./variants";

export type { NumberInputSize, NumberInputVariant };

export interface NumberInputProps {
	/** Controlled; `null` is an empty field. */
	value: number | null;
	onValueChange: (value: number | null) => void;
	min?: number;
	max?: number;
	step?: number;
	/** PageUp/PageDown and Shift+Arrow step. */
	largeStep?: number;
	/** Display format, e.g. `{ style: "currency", currency: "USD" }`. */
	formatOptions?: Intl.NumberFormatOptions;
	locale?: Intl.LocalesArgument;
	/** Visible label; dragging it sideways scrubs the value. */
	label?: string;
	variant?: NumberInputVariant;
	size?: NumberInputSize;
	/** Scrub: a unit shown after the value, e.g. "px". */
	suffix?: string;
	disabled?: boolean;
	invalid?: boolean;
	name?: string;
	placeholder?: string;
	id?: string;
	"aria-label"?: string;
	className?: string;
	decrementLabel?: string;
	incrementLabel?: string;
}

export function NumberInput({
	value,
	onValueChange,
	min,
	max,
	step = 1,
	largeStep = 10,
	formatOptions,
	locale,
	label,
	variant = "default",
	size = "md",
	suffix,
	disabled = false,
	invalid = false,
	name,
	placeholder,
	id: idProp,
	"aria-label": ariaLabel,
	className,
	decrementLabel = "Decrease",
	incrementLabel = "Increase",
}: NumberInputProps) {
	const s = numberInput({ variant, size });
	const fallbackId = useId();
	const id = idProp ?? fallbackId;

	return (
		<NumberField.Root
			id={id}
			value={value}
			onValueChange={(next) => onValueChange(next)}
			min={min}
			max={max}
			step={step}
			largeStep={largeStep}
			format={formatOptions}
			locale={locale}
			disabled={disabled}
			name={name}
			data-slot="number-input"
			data-variant={variant}
			className={cn(s.root(), className)}
		>
			{label && variant === "default" ? (
				<NumberField.ScrubArea className={s.label()}>
					<label htmlFor={id}>{label}</label>
				</NumberField.ScrubArea>
			) : null}
			{variant === "scrub" ? (
				<NumberField.Group className={s.group()}>
					{label ? (
						<NumberField.ScrubArea className={s.label()}>
							<label htmlFor={id}>{label}</label>
							<svg viewBox="0 0 16 16" fill="none" aria-hidden className={s.grip()}>
								<path
									d="M5 4.5 1.5 8 5 11.5M11 4.5 14.5 8 11 11.5"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</NumberField.ScrubArea>
					) : null}
					<NumberField.Input
						placeholder={placeholder}
						aria-label={label ? undefined : ariaLabel}
						aria-invalid={invalid || undefined}
						className={s.input()}
					/>
					{suffix ? <span className={s.suffix()}>{suffix}</span> : null}
				</NumberField.Group>
			) : (
				<NumberField.Group className={s.group()}>
					<NumberField.Decrement aria-label={decrementLabel} className={s.button()}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden
						>
							<path d="M5 12h14" />
						</svg>
					</NumberField.Decrement>
					<NumberField.Input
						placeholder={placeholder}
						aria-label={label ? undefined : ariaLabel}
						aria-invalid={invalid || undefined}
						className={s.input()}
					/>
					<NumberField.Increment aria-label={incrementLabel} className={s.button()}>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							aria-hidden
						>
							<path d="M12 5v14M5 12h14" />
						</svg>
					</NumberField.Increment>
				</NumberField.Group>
			)}
		</NumberField.Root>
	);
}
