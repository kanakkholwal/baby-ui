"use client";

import { type ComponentProps, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "../input-group/input-group";
import { cn } from "../lib/cn";
import {
	caretAfter,
	currencyParts,
	formatEditing,
	formatMinor,
	inRange,
	significantBefore,
	toMinor,
} from "./core";
import {
	type CurrencyInputAffix,
	type CurrencyInputSize,
	currencyInput,
} from "./variants";

export type { CurrencyParts } from "./core";
export type { CurrencyInputAffix, CurrencyInputSize };

export interface CurrencyInputProps
	extends Omit<
		ComponentProps<"input">,
		"size" | "type" | "value" | "onChange" | "defaultValue" | "min" | "max"
	> {
	/** Minor units (cents for USD, yen for JPY); null when empty. */
	value: number | null;
	onValueChange: (value: number | null) => void;
	/** ISO 4217 code, e.g. "USD". */
	currency: string;
	locale?: string;
	/** Bounds in minor units; out-of-range values are flagged, not clamped. */
	min?: number;
	max?: number;
	affix?: CurrencyInputAffix;
	size?: CurrencyInputSize;
	/** Applied to the wrapper; everything else lands on the `<input>`. */
	className?: string;
}

export function CurrencyInput({
	value,
	onValueChange,
	currency,
	locale,
	min,
	max,
	affix = "both",
	size = "md",
	className,
	onFocus,
	onBlur,
	...props
}: CurrencyInputProps) {
	const s = currencyInput({ size, affix });
	const parts = useMemo(() => currencyParts(locale, currency), [locale, currency]);
	// While focused the field keeps what was typed ("12."); on blur it shows the full format.
	const [draft, setDraft] = useState<string | null>(null);
	const ref = useRef<HTMLInputElement>(null);
	const caret = useRef<number | null>(null);
	const text = draft ?? (value === null ? "" : formatMinor(value, parts, locale));
	const invalid = !inRange(value, min, max);

	useLayoutEffect(() => {
		const count = caret.current;
		const el = ref.current;
		if (count === null || !el) return;
		caret.current = null;
		const at = caretAfter(el.value, count, parts);
		el.setSelectionRange(at, at);
	});

	return (
		<InputGroup
			data-slot="currency-input"
			size={size}
			className={cn(s.root(), className)}
		>
			{affix !== "code" && parts.symbol ? (
				<InputGroupAddon>
					<InputGroupText className={s.symbol()} aria-hidden="true">
						{parts.symbol}
					</InputGroupText>
				</InputGroupAddon>
			) : null}
			<InputGroupInput
				ref={ref}
				inputMode="decimal"
				autoComplete="off"
				placeholder={formatMinor(0, parts, locale)}
				value={text}
				aria-invalid={invalid || props["aria-invalid"] || undefined}
				className={s.control()}
				onFocus={(e) => {
					setDraft(text);
					onFocus?.(e);
				}}
				onBlur={(e) => {
					setDraft(null);
					onBlur?.(e);
				}}
				onChange={(e) => {
					const el = e.currentTarget;
					const count = significantBefore(
						el.value,
						el.selectionStart ?? el.value.length,
						parts,
					);
					const next = formatEditing(el.value, parts);
					caret.current = count;
					setDraft(next);
					onValueChange(toMinor(next, parts));
				}}
				{...props}
			/>
			{affix !== "symbol" ? (
				<InputGroupAddon align="inline-end">
					<InputGroupText className={s.code()}>{currency}</InputGroupText>
				</InputGroupAddon>
			) : null}
		</InputGroup>
	);
}
