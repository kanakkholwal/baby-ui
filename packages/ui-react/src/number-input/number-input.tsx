"use client";

import { NumberField } from "@base-ui/react/number-field";
import { useId } from "react";
import { cn } from "../lib/cn";
import { type NumberInputSize, numberInput } from "./variants";

export type { NumberInputSize };

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
	size?: NumberInputSize;
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
	size = "md",
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
	const s = numberInput({ size });
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
			className={cn(s.root(), className)}
		>
			{label ? (
				<NumberField.ScrubArea className={s.label()}>
					<label htmlFor={id}>{label}</label>
				</NumberField.ScrubArea>
			) : null}
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
		</NumberField.Root>
	);
}
